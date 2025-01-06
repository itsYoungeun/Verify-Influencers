import Influencer from "../models/influencer.model.js";
import mongoose from "mongoose";

export const createInfluencer = async (req, res) => {
  try {
    const influencers = await Influencer.insertMany(req.body); // Use insertMany to insert multiple documents at once
    res.status(201).json(influencers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const fetchInfluencer = async (req, res) => {
    try {
        const influencers = await Influencer.find();
        res.json(influencers); // Send the fetched influencers as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching influencers' });
    }
};

export const getInfluencerById = async (req, res) => {
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
};