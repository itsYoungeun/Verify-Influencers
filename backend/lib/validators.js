import { z } from "zod";

// Only allow http(s) URLs — links are rendered as href, so javascript:/data:
// URIs would be a stored-XSS vector.
const url = z
	.string()
	.trim()
	.url("Must be a valid URL")
	.refine((v) => /^https?:\/\//i.test(v), "Link must start with http:// or https://");

// Auth
export const signupSchema = z.object({
	name: z.string().trim().min(1, "Name is required").max(100),
	email: z.string().trim().toLowerCase().email("Must be a valid email"),
	password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export const loginSchema = z.object({
	email: z.string().trim().toLowerCase().email("Must be a valid email"),
	password: z.string().min(1, "Password is required"),
});

// Claims
export const claimSchema = z.object({
	category: z.union([z.string().trim().min(1), z.array(z.string().trim().min(1)).nonempty()]),
	title: z.string().trim().min(1, "Title is required"),
	link: url,
	name: z.string().trim().min(1, "Name is required"),
	date: z.string().trim().min(1, "Date is required"),
});

// Research
export const researchSchema = z.object({
	journal: z.string().trim().min(1, "Journal is required"),
	category: z.string().trim().min(1, "Category is required"),
	title: z.string().trim().min(1, "Title is required"),
	link: url,
});

// Influencers — accepts a single influencer or an array (controller uses insertMany).
const influencerSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),
}).passthrough();

export const influencerInputSchema = z.union([influencerSchema, z.array(influencerSchema).nonempty()]);
