// Map PubMed result volume to a coarse, honest evidence label + 0-100 score.
// Kept dependency-free so it can be unit-tested without a Redis/DB connection.
export const summarizeEvidence = (total) => {
	if (total >= 100) return { evidence: "Strong", score: 90 };
	if (total >= 25) return { evidence: "Moderate", score: 75 };
	if (total >= 5) return { evidence: "Limited", score: 55 };
	if (total >= 1) return { evidence: "Sparse", score: 35 };
	return { evidence: "None found", score: 10 };
};
