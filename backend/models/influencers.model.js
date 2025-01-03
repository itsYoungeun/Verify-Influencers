import mongoose from "mongoose";

const influencerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    profilePhoto: String,
    bio: String,
    categories:[{
        type: String,
        enum: [
            'Sleep',
            'Performance',
            'Hormones',
            'Nutrition',
            'Exercise',
            'Stress',
            'Cognition',
            'Motivation',
            'Recovery',
            'Mental Health'
        ]
    }],
    trustScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    yearlyRevenue: Number,
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
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
}, {
    timestamps: true
});

const Influencer = mongoose.model("Influencer", influencerSchema);

export default Influencer;