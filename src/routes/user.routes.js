const express = require("express");
const router = express.Router();

const Article = require("../models/Article");
const VideoPost = require("../models/videoPost");   // ✅ MUST IMPORT THIS MODEL

/* ================================
   USER – NEWS ARTICLES
================================ */

// Show ALL News
router.get("/news", async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" })
      .sort({ createdAt: -1 });

    res.render("user/User_Dashboard", { articles });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Single News Page
router.get("/news/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    res.render("user/news_detail", { article });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Latest News (List Page)
router.get("/Latest", async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" })
      .sort({ createdAt: -1 });

    res.render("user/news_list", { articles });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


/* ================================
   USER – VIDEOS SECTION
================================ */

// ALL Published Videos
router.get("/videos", async (req, res) => {
  try {
    const videos = await VideoPost.find({ status: "published" })
      .sort({ createdAt: -1 });

    res.render("user/videos_list", { videos });  // Pass data to frontend
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading videos");
  }
});

// Single Video Page
router.get("/video/:id", async (req, res) => {
  try {
    const video = await VideoPost.findById(req.params.id);

    if (!video) return res.status(404).send("Video Not Found");

    res.render("user/video_single", { video });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching video");
  }
});




const CurrentAffair = require("../models/CurrentAffair");

router.get("/current-affairs", async (req, res) => {
    const affairs = await CurrentAffair.find({ status: "published" }).sort({ createdAt: -1 });
    res.render("user/current_affairs_list", { affairs });
});

router.get("/current-affairs/:id", async (req, res) => {
    const affair = await CurrentAffair.findById(req.params.id);
    res.render("user/current_affair_single", { affair });
});

// LIKE
router.post("/current-affairs/:id/like", async (req, res) => {
    await CurrentAffair.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
    res.redirect("/current-affairs/" + req.params.id);
});

// COMMENT
router.post("/current-affairs/:id/comment", async (req, res) => {
    const { username, comment } = req.body;
    await CurrentAffair.findByIdAndUpdate(req.params.id, {
        $push: { comments: { username, comment } }
    });
    res.redirect("/current-affairs/" + req.params.id);
});










module.exports = router;
