import express from "express";
import Influencer from '../models/influencer.model.js';
import { createInfluencer, fetchInfluencer, getInfluencerById } from "../controllers/influencer.controller.js";
import mongoose from 'mongoose';

const router = express.Router();

// POST endpoint to upload influencer data
router.post("/influencers", createInfluencer);

// GET all influencers
router.get('/influencers', fetchInfluencer);

// **GET a single influencer by ID**
router.get('/influencers/:id', getInfluencerById);

export default router;
