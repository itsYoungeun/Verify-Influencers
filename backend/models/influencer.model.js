import mongoose from "mongoose";

const influencerSchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    category: {
      type: String,
      required: [true, "Category is required!"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required!"],
    },
    trustScore: {
      type: Number,
      required: [true, "Trust score is required!"],
    },
    trend: {
      type: String,
      enum: ["up", "down"],
      required: [true, "Trend is required!"],
    },
    followers: {
      type: String,
      required: [true, "Followers count is required!"],
    },
    verifiedClaims: {
      type: Number,
      required: [true, "Number of verified claims is required!"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required!"],
    },
    // claims: [claimSchema]
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Influencer = mongoose.model("Influencer", influencerSchema);

export default Influencer;