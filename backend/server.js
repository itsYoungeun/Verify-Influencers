import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import influencerRoutes from "./routes/influencer.route.js";
import claimRoutes from "./routes/claim.route.js";
import researchRoutes from "./routes/research.route.js"

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Behind Vercel's proxy: trust the first hop so req.ip reflects the real
// client IP (X-Forwarded-For). Without this, express-rate-limit throws.
app.set("trust proxy", 1);

const __dirname = path.resolve();

// Allowed origins for credentialed (cookie-bearing) requests.
// Configure CLIENT_URL in production (comma-separated for multiple).
const defaultOrigins = "http://localhost:5173,https://verify-influencers-ebon.vercel.app";
const allowedOrigins = (process.env.CLIENT_URL || defaultOrigins)
	.split(",")
	.map((o) => o.trim())
	.filter(Boolean);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(
	cors({
		origin: (origin, callback) => {
			// Allow same-origin / server-to-server requests (no Origin header).
			if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
			return callback(new Error("Not allowed by CORS"));
		},
		credentials: true,
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/influencers", influencerRoutes); // Use influencer routes here
app.use("/api/claims", claimRoutes);
app.use("/api/research", researchRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
    connectDB();
  });
}

export default app;