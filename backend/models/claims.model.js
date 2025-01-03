import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
    statement: String,
    dateStated: Date,
    Verified: Boolean,
    Verified: [{
        title: String,
        link: String,
        publishDate: Date,
    }],
    questionable: [{
        title: String,
        link: String,
        publishDate: Date,
    }],
    debunked: [{
        title: String,
        link: String,
        publishDate: Date,
    }],
    influencer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Influencer",
    },
}, {
    timestamps: true
});
