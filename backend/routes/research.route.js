import express from "express";
import { addResearch, getResearchByCategory } from "../controllers/research.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, addResearch);

router.get("/", getResearchByCategory);

export default router;

// "Sleep", "Performance", "Hormones", "Nutrition", "Exercise", "Stress", "Cognition", "Motivation", "Recovery", "Mental Health"