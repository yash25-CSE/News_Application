const mongoose = require("mongoose");

const currentAffairSchema = new mongoose.Schema({
    headline: { type: String, required: true },
    article: { type: String, required: true },

    imageUrl: { type: String },   // OPTIONAL
    videoUrl: { type: String },   // OPTIONAL (YouTube)

    tags: [{ type: String }],

    likes: { type: Number, default: 0 },

    comments: [
        {
            username: String,
            comment: String,
            date: { type: Date, default: Date.now }
        }
    ],

    status: {
        type: String,
        enum: ["published", "draft"],
        default: "published"
    }

}, { timestamps: true });

module.exports = mongoose.model("CurrentAffair", currentAffairSchema);
