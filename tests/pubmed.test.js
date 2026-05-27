import { describe, it, expect } from "vitest";
import { summarizeEvidence } from "../backend/lib/evidence.js";

describe("summarizeEvidence", () => {
	it("labels high result counts as Strong", () => {
		expect(summarizeEvidence(500).evidence).toBe("Strong");
	});

	it("labels mid result counts as Moderate", () => {
		expect(summarizeEvidence(30).evidence).toBe("Moderate");
	});

	it("labels low result counts as Limited or Sparse", () => {
		expect(summarizeEvidence(10).evidence).toBe("Limited");
		expect(summarizeEvidence(2).evidence).toBe("Sparse");
	});

	it("labels zero results as None found", () => {
		expect(summarizeEvidence(0).evidence).toBe("None found");
	});

	it("always returns a score between 0 and 100", () => {
		for (const n of [0, 1, 5, 25, 100, 9999]) {
			const { score } = summarizeEvidence(n);
			expect(score).toBeGreaterThanOrEqual(0);
			expect(score).toBeLessThanOrEqual(100);
		}
	});
});
