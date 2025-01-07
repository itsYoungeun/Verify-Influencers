import express from "express";
import { createInfluencer, fetchInfluencer, getInfluencerById } from "../controllers/influencer.controller.js";

const router = express.Router();

// POST endpoint to upload influencer data
router.post("/", createInfluencer);

// GET all influencers
router.get('/', fetchInfluencer);

// **GET a single influencer by ID**
router.get('/:id', getInfluencerById);

export default router;
