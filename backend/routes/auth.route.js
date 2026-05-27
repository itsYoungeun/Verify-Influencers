import express from "express";
import { login, logout, signup, refreshToken, getProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { signupSchema, loginSchema } from "../lib/validators.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/signup", authLimiter, validateBody(signupSchema), signup);
router.post("/login", authLimiter, validateBody(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh-token", authLimiter, refreshToken);
router.get("/profile", protectRoute, getProfile);

export default router;
