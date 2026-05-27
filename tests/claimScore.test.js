import { describe, it, expect } from "vitest";
import { calculateClaimTrustScore } from "../frontend/src/utils/calculateClaimScore.jsx";

describe("calculateClaimTrustScore", () => {
	it("is deterministic (no random variance)", () => {
		const date = "2023-01-01";
		const a = calculateClaimTrustScore(date, "Vitamin D supports immunity");
		const b = calculateClaimTrustScore(date, "Vitamin D supports immunity");
		expect(a).toBe(b);
	});

	it("stays within the 60-95 range", () => {
		for (const date of ["2025-01-01", "2020-01-01", "2010-01-01", "1999-01-01"]) {
			const score = calculateClaimTrustScore(date);
			expect(score).toBeGreaterThanOrEqual(60);
			expect(score).toBeLessThanOrEqual(95);
		}
	});

	it("penalizes uncertain language", () => {
		const date = "2024-06-01";
		const confident = calculateClaimTrustScore(date, "Creatine improves strength");
		const uncertain = calculateClaimTrustScore(date, "Creatine might possibly maybe improve strength");
		expect(uncertain).toBeLessThanOrEqual(confident);
	});
});
