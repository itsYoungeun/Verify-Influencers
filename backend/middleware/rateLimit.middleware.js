import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redis } from "../lib/redis.js";

// Use a shared Redis store so limits hold across serverless invocations.
// (In-memory limiting is useless on Vercel — each cold start would reset it.)
const makeStore = (prefix) =>
	new RedisStore({
		prefix,
		sendCommand: (...args) => redis.call(...args),
	});

// Derive a key without ever returning undefined (req.ip can be undefined in
// some serverless setups, which makes express-rate-limit throw).
const keyGenerator = (req) =>
	req.ip || (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "global";

const build = (prefix, { windowMs, limit, message }) => {
	const limiter = rateLimit({
		windowMs,
		limit,
		standardHeaders: "draft-7",
		legacyHeaders: false,
		// Disable internal proxy/IP validations that throw under Vercel's proxy.
		validate: false,
		keyGenerator,
		message: { message },
		store: makeStore(prefix),
	});

	// Fail-open: a rate-limit/store error must never 500 the whole API.
	return (req, res, next) => {
		try {
			limiter(req, res, (err) => {
				if (err) {
					console.error(`Rate limiter error (${prefix}), passing through:`, err?.message);
					return next();
				}
				next();
			});
		} catch (err) {
			console.error(`Rate limiter threw (${prefix}), passing through:`, err?.message);
			next();
		}
	};
};

// Stricter limiter for auth: blunts credential-stuffing / brute force.
export const authLimiter = build("rl:auth:", {
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 20,
	message: "Too many attempts. Please try again later.",
});

// General limiter for write/admin endpoints.
export const writeLimiter = build("rl:write:", {
	windowMs: 15 * 60 * 1000,
	limit: 100,
	message: "Too many requests. Please slow down.",
});
