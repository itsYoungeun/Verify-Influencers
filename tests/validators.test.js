import { describe, it, expect } from "vitest";
import {
	signupSchema,
	claimSchema,
	researchSchema,
	influencerInputSchema,
} from "../backend/lib/validators.js";

describe("signupSchema", () => {
	it("accepts a valid signup and lowercases the email", () => {
		const parsed = signupSchema.parse({
			name: "Jane",
			email: "Jane@Example.COM",
			password: "secret123",
		});
		expect(parsed.email).toBe("jane@example.com");
	});

	it("rejects a short password", () => {
		expect(signupSchema.safeParse({ name: "J", email: "a@b.com", password: "123" }).success).toBe(false);
	});

	it("rejects an invalid email", () => {
		expect(signupSchema.safeParse({ name: "J", email: "not-an-email", password: "secret123" }).success).toBe(false);
	});
});

describe("claimSchema", () => {
	const base = { category: "Nutrition", title: "Vitamin D helps", link: "https://example.com", name: "Dr. X", date: "2024-01-01" };

	it("accepts a valid claim", () => {
		expect(claimSchema.safeParse(base).success).toBe(true);
	});

	it("rejects a non-URL link", () => {
		expect(claimSchema.safeParse({ ...base, link: "javascript:alert(1)" }).success).toBe(false);
	});

	it("accepts an array of categories", () => {
		expect(claimSchema.safeParse({ ...base, category: ["Nutrition", "Sleep"] }).success).toBe(true);
	});
});

describe("researchSchema", () => {
	it("requires all fields and a valid URL", () => {
		expect(researchSchema.safeParse({ journal: "J", category: "Sleep", title: "T", link: "nope" }).success).toBe(false);
		expect(researchSchema.safeParse({ journal: "J", category: "Sleep", title: "T", link: "https://x.com" }).success).toBe(true);
	});
});

describe("influencerInputSchema", () => {
	it("accepts a single object or an array", () => {
		expect(influencerInputSchema.safeParse({ name: "Andrew" }).success).toBe(true);
		expect(influencerInputSchema.safeParse([{ name: "Andrew" }, { name: "Bryan" }]).success).toBe(true);
	});

	it("rejects an empty array", () => {
		expect(influencerInputSchema.safeParse([]).success).toBe(false);
	});
});
