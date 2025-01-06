import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path;"

import authRoutes from "./routes/auth.route.js";
import influencerRoutes from "./routes/influencer.route.js";
import claimRoutes from "./routes/claim.route.js";
import researchRoutes from "./routes/research.route.js"

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", influencerRoutes); // Use influencer routes here
app.use("/api", claimRoutes);
app.use("/api", researchRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
  connectDB();
});