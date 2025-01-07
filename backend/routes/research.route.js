import express from "express";
import { addResearch, getResearchByCategory } from "../controllers/research.controller.js";

const router = express.Router();

router.post("/", addResearch);

router.get("/", getResearchByCategory);

export default router;

// "Sleep", "Performance", "Hormones", "Nutrition", "Exercise", "Stress", "Cognition", "Motivation", "Recovery", "Mental Health"