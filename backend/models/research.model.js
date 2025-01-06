import mongoose from "mongoose";

// Define the schema for individual claims
const researchSchema = new mongoose.Schema(
  {
    category: {
      type: [String],
      required: [true, "Category is required!"],
    },
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    link: {
      type: String,
      required: [true, "Link is required!"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Research = mongoose.model("Research", researchSchema);

export default Research;