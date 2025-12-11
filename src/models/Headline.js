const mongoose = require("mongoose");

const headlineSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String },
    imageUrl: { type: String },
    status: { type: String, enum: ["published", "draft"], default: "published" },
}, { timestamps: true });

module.exports = mongoose.model("Headline", headlineSchema);
