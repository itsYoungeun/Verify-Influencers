import express from "express";
import { addClaim, getClaimsByCategory } from "../controllers/claim.controller.js";

const router = express.Router();

// POST: Create a new claim
router.post("/claims", addClaim);

// GET: Get all claims
router.get("/claims", getClaimsByCategory);

export default router;