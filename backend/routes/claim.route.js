import express from "express";
import { addClaim, getClaimsByName } from "../controllers/claim.controller.js";

const router = express.Router();

// POST: Create a new claim
router.post("/", addClaim);

// GET: Get all claims
router.get("/", getClaimsByName);

export default router;