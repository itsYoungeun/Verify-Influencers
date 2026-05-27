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

// Stricter limiter for auth: blunts credential-stuffing / brute force.
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 20,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message: { message: "Too many attempts. Please try again later." },
	store: makeStore("rl:auth:"),
});

// General limiter for write/admin endpoints.
export const writeLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message: { message: "Too many requests. Please slow down." },
	store: makeStore("rl:write:"),
});
