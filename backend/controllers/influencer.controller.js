import Influencer from "../models/influencer.model.js";
import mongoose from "mongoose";
import { redis } from "../lib/redis.js";

const INFLUENCERS_CACHE_KEY = "influencers:all";
const INFLUENCERS_CACHE_TTL = 60 * 5; // 5 minutes

export const createInfluencer = async (req, res) => {
  try {
    // Accept either a single influencer object or an array of them.
    const docs = Array.isArray(req.body) ? req.body : [req.body];
    const influencers = await Influencer.insertMany(docs);
    // Invalidate the cached list so new influencers show up immediately.
    try { await redis.del(INFLUENCERS_CACHE_KEY); } catch { /* non-fatal */ }
    res.status(201).json(influencers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const fetchInfluencer = async (req, res) => {
    try {
        // Serve from cache when available (leaderboard hits this on every load).
        try {
            const cached = await redis.get(INFLUENCERS_CACHE_KEY);
            if (cached) return res.status(200).json(JSON.parse(cached));
        } catch { /* fall through to DB on cache error */ }

        const influencers = await Influencer.find();

        try {
            await redis.set(INFLUENCERS_CACHE_KEY, JSON.stringify(influencers), "EX", INFLUENCERS_CACHE_TTL);
        } catch { /* non-fatal */ }

        res.status(200).json(influencers);
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