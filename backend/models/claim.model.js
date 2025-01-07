import mongoose from "mongoose";

// Define the schema for individual claims
const claimSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: [true, "Link is required!"],
    },
    date: {
      type: String,
      required: [true, "Date is required!"],
    },
    // influencer: {
    //   type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference another document
    //   ref: "Influencer", // Reference the Influencer model
    //   required: true, // Set to true if every claim must be associated with an influencer
    // }
    // TODO IN FUTURE
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;