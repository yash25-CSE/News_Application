const mongoose = require("mongoose");

const photoPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    article: { type: String, required: true },
    imageUrl: { type: String },   // For Google Drive or URL
    imageFile: { type: String },  // For uploaded file
    tags: [String],
    comments: [
        {
            user: String,
            message: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    likes: { type: Number, default: 0 },
    status: { type: String, default: "published" }
}, { timestamps: true });

module.exports = mongoose.model("PhotoPost", photoPostSchema);
