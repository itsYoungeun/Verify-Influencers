import Influencer from "../models/influencer.model.js"; // Ensure this model exists
import { redis } from "../lib/redis.js"; // Redis for caching (optional)

// Search influencers with filters
export const searchInfluencers = async (req, res) => {
  try {
    const { platform, minFollowers, maxFollowers, niche, name } = req.query;

    // Build search query dynamically
    const query = {};
    if (platform) query.platform = platform;
    if (minFollowers) query.followers = { $gte: Number(minFollowers) };
    if (maxFollowers) query.followers = { ...query.followers, $lte: Number(maxFollowers) };
    if (niche) query.niche = niche;
    if (name) query.name = { $regex: name, $options: "i" }; // Case-insensitive search

    // Check Redis cache first (optional)
    const cacheKey = JSON.stringify(query);
    const cachedResults = await redis.get(cacheKey);
    if (cachedResults) {
      return res.status(200).json(JSON.parse(cachedResults));
    }

    // Search in MongoDB
    const influencers = await Influencer.find(query);

    // Cache results (optional)
    await redis.set(cacheKey, JSON.stringify(influencers), "EX", 60 * 5); // Cache for 5 minutes

    res.status(200).json(influencers);
  } catch (error) {
    console.error("Error in searchInfluencers controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};