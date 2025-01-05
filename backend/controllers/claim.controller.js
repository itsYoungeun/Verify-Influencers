import Claim from "../models/claim.model.js";

// Add a new claim
export const addClaim = async (req, res) => {
  try {
    const { category, title, link, date } = req.body;

    if (!category || !title || !link || !date) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const claim = new Claim({ category, title, link, date });
    await claim.save();

    res.status(201).json({ message: "Claim added successfully!", claim });
  } catch (error) {
    res.status(500).json({ error: "Failed to add claim.", details: error.message });
  }
};

// Fetch claims by categories
export const getClaimsByCategory = async (req, res) => {
  try {
    const { categories } = req.query; // Expecting categories to be a comma-separated string (e.g., "Health,Nutrition")

    if (!categories) {
      return res.status(400).json({ error: "Categories are required!" });
    }

    const categoryArray = categories.split(","); // Convert string into an array
    const claims = await Claim.find({ category: { $in: categoryArray } }); // Use $in operator to match any category

    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch claims.", details: error.message });
  }
};