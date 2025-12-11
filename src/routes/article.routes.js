const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// PUBLISH ARTICLE
router.post("/publish", async (req, res) => {
  try {
    const { title, category, author, content, tags, status } = req.body;

    const article = new Article({
      title,
      category,
      author,
      content,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      status
    });

    await article.save();

    // ✅ after save redirect back to editor or dashboard
    res.redirect("/admin/write_article");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving article");
  }
});

module.exports = router;
