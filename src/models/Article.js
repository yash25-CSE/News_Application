const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    author: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    tags: [
      {
        type: String
      }
    ],

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
