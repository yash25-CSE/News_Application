const mongoose = require("mongoose");

const videoPostSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
}, { timestamps: true });

module.exports = mongoose.model("VideoPost", videoPostSchema);
