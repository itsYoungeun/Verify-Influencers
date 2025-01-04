import express from "express";
import Influencer from '../models/influencer.model.js';
import { createInfluencer } from "../controllers/influencer.controller.js";
import mongoose from 'mongoose';

const router = express.Router();

// POST endpoint to upload influencer data
router.post("/influencers", createInfluencer);

// GET all influencers
router.get('/influencers', async (req, res) => {
    try {
        const influencers = await Influencer.find();
        res.json(influencers); // Send the fetched influencers as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching influencers' });
    }
});

// **GET a single influencer by ID**
router.get('/influencers/:id', async (req, res) => {
  const { id } = req.params;

  // Validate if the ID is a valid ObjectId (MongoDB)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid influencer ID format' });
  }

  try {
    const influencer = await Influencer.findById(id);
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }
    res.json(influencer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching influencer details' });
  }
});

export default router;
