import express from "express";
import { addResearch, getResearchByCategory } from "../controllers/research.controller.js";

const router = express.Router();

router.post("/research", addResearch);

router.get("/research", getResearchByCategory);

export default router;