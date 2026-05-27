import express from "express";
import { addClaim, getClaimsByName } from "../controllers/claim.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST: Create a new claim (admin only)
router.post("/", protectRoute, adminRoute, addClaim);

// GET: Get all claims
router.get("/", getClaimsByName);

export default router;