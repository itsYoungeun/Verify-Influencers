import express from "express";
import { addResearch, getResearchByCategory } from "../controllers/research.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { researchSchema } from "../lib/validators.js";
import { writeLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/", writeLimiter, protectRoute, adminRoute, validateBody(researchSchema), addResearch);
router.get("/", getResearchByCategory);

export default router;
