import Influencer from "../models/influencer.model.js";

export const createInfluencer = async (req, res) => {
  try {
    const influencers = await Influencer.insertMany(req.body); // Use insertMany to insert multiple documents at once
    res.status(201).json(influencers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};