import Claim from "../models/claim.model.js";
import { searchPubMed } from "../lib/pubmed.js";

// Add a new claim
export const addClaim = async (req, res) => {
  try {
    const { category, title, link, name, date } = req.body;

    const claim = new Claim({ category, title, link, name, date });
    await claim.save();

    res.status(201).json({ message: "Claim added successfully!", claim });
  } catch (error) {
    res.status(500).json({ error: "Failed to add claim.", details: error.message });
  }
};

export const getClaimsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name is required!" });
    }

    const claims = await Claim.find({ name: name });
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch claims.", details: error.message });
  }
};

// Verify a claim against PubMed peer-reviewed literature.
// Returns real citations plus an evidence label/score for the topic.
export const verifyClaim = async (req, res) => {
  try {
    const query = req.query.q || req.query.query;
    if (!query) {
      return res.status(400).json({ error: "A query (?q=) is required!" });
    }

    const result = await searchPubMed(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(502).json({ error: "Failed to fetch evidence from PubMed.", details: error.message });
  }
};
