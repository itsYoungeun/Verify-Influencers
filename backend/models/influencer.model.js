import mongoose from "mongoose";

const influencerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    socialMediaLinks: {
        type: Map,
        of: String,
        default: {}
    },
    followerCount: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
        enum: ["influencer", "admin"],
        default: "influencer",
    }
}, {
    timestamps: true
});

const Influencer = mongoose.model("Influencer", influencerSchema);

export default Influencer;