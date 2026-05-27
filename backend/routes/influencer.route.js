import express from "express";
import { createInfluencer, fetchInfluencer, getInfluencerById } from "../controllers/influencer.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST endpoint to upload influencer data (admin only)
router.post("/", protectRoute, adminRoute, createInfluencer);

// GET all influencers
router.get('/', fetchInfluencer);

// **GET a single influencer by ID**
router.get('/:id', getInfluencerById);

export default router;
