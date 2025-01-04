import express from "express";
import Influencer from '../models/influencer.model.js';
import { createInfluencer } from "../controllers/influencer.controller.js";

const router = express.Router();

router.post("/influencers", createInfluencer); // Endpoint to upload influencer data

// Get all influencers
router.get('/influencers', async (req, res) => {
    try {
      const influencers = await Influencer.find();
      res.json(influencers); // Send the fetched influencers as a JSON response
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Error fetching influencers' });
    }
  });

export default router;