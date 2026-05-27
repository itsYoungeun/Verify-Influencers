import express from "express";
import { addClaim, getClaimsByName, verifyClaim } from "../controllers/claim.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { claimSchema } from "../lib/validators.js";
import { writeLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

// POST: Create a new claim (admin only)
router.post("/", writeLimiter, protectRoute, adminRoute, validateBody(claimSchema), addClaim);

// GET: Get claims by influencer name
router.get("/", getClaimsByName);

// GET: Verify a claim against PubMed evidence (?q=...)
router.get("/verify", verifyClaim);

export default router;
