import Research from "../models/research.model.js";

// Add a new claim
export const addResearch = async (req, res) => {
  try {
    const { journal, category, title, link } = req.body;

    if (!journal || !category || !title || !link) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const research = new Research({ journal, category, title, link });
    await research.save();

    res.status(201).json({ message: "Research added successfully!", research });
  } catch (error) {
    res.status(500).json({ error: "Failed to add research.", details: error.message });
  }
};

// Fetch claims by categories
export const getResearchByCategory = async (req, res) => {
  try {
    const { categories } = req.query; // Expecting categories to be a comma-separated string (e.g., "Health,Nutrition")

    if (!categories) {
      return res.status(400).json({ error: "Categories are required!" });
    }

    const categoryArray = categories.split(","); // Convert string into an array
    const research = await Research.find({ category: { $in: categoryArray } }); // Use $in operator to match any category

    res.status(200).json(research);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch research.", details: error.message });
  }
};