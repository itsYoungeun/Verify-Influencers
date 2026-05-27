import { redis } from "./redis.js";
import { summarizeEvidence } from "./evidence.js";

const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const CACHE_TTL = 60 * 60 * 24; // 24h — PubMed results are stable enough to cache

// NCBI asks callers to identify themselves and (optionally) supply an API key
// to raise the rate limit from 3 to 10 req/s. Both are optional.
const idParams = () => {
	const p = new URLSearchParams();
	if (process.env.PUBMED_API_KEY) p.set("api_key", process.env.PUBMED_API_KEY);
	p.set("tool", "verify-influencers");
	if (process.env.PUBMED_EMAIL) p.set("email", process.env.PUBMED_EMAIL);
	return p;
};

const fetchJson = async (url) => {
	const res = await fetch(url, { headers: { Accept: "application/json" } });
	if (!res.ok) throw new Error(`PubMed request failed: ${res.status}`);
	return res.json();
};

/**
 * Search PubMed for a claim/query and return a normalized result:
 *   { query, total, articles: [{ pmid, title, journal, year, url }], evidence, score }
 * Results are cached in Redis by query. `evidence`/`score` summarize how much
 * peer-reviewed literature exists for the topic — this surfaces real citations
 * rather than fabricating a verdict.
 */
export const searchPubMed = async (query, { retmax = 6 } = {}) => {
	const cleaned = String(query || "").trim();
	if (!cleaned) throw new Error("query is required");

	const cacheKey = `pubmed:${cleaned.toLowerCase()}:${retmax}`;
	try {
		const cached = await redis.get(cacheKey);
		if (cached) return JSON.parse(cached);
	} catch {
		// cache read failures should never break the request
	}

	// 1) esearch — get matching PMIDs + total count
	const searchParams = idParams();
	searchParams.set("db", "pubmed");
	searchParams.set("term", cleaned);
	searchParams.set("retmode", "json");
	searchParams.set("retmax", String(retmax));
	searchParams.set("sort", "relevance");
	const search = await fetchJson(`${EUTILS}/esearch.fcgi?${searchParams}`);

	const idlist = search?.esearchresult?.idlist ?? [];
	const total = Number(search?.esearchresult?.count ?? 0);

	let articles = [];
	if (idlist.length) {
		// 2) esummary — get title/journal/year for each PMID
		const sumParams = idParams();
		sumParams.set("db", "pubmed");
		sumParams.set("id", idlist.join(","));
		sumParams.set("retmode", "json");
		const summary = await fetchJson(`${EUTILS}/esummary.fcgi?${sumParams}`);
		const result = summary?.result ?? {};
		articles = idlist
			.map((id) => result[id])
			.filter(Boolean)
			.map((doc) => ({
				pmid: doc.uid,
				title: doc.title,
				journal: doc.fulljournalname || doc.source,
				year: (doc.pubdate || "").slice(0, 4),
				url: `https://pubmed.ncbi.nlm.nih.gov/${doc.uid}/`,
			}));
	}

	const { evidence, score } = summarizeEvidence(total);
	const payload = { query: cleaned, total, articles, evidence, score };

	try {
		await redis.set(cacheKey, JSON.stringify(payload), "EX", CACHE_TTL);
	} catch {
		// ignore cache write failures
	}
	return payload;
};
