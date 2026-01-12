const express = require("express");
const router = express.Router();

const VideoPost = require("../models/videoPost");

// SHOW Upload Video Page (admin side)
router.get("/upload_video", (req, res) => {
    res.render("admin/upload_video", { pageTitle: "Upload Video" });
});

router.post("/video/publish", async (req, res) => {
    
    try {
        const { headline, videoUrl, article, tags, status } = req.body;

        const tagArray = tags ? tags.split(",").map(t => t.trim()) : [];

        await VideoPost.create({
            headline,
            videoUrl,
            article,
            tags: tagArray,
            status: status === "published" ? "published" : "draft"
        });

        res.send("Video + Article Uploaded Successfully!");
        
    } catch (error) {
        res.status(500).send("Error publishing video: " + error.message);
    }
});









// ===============================
// ADMIN – SHOW ALL VIDEOS
// ===============================
router.get("/videos", async (req, res) => {
  try {
    const videos = await VideoPost.find().sort({ createdAt: -1 });

    // 🔑 THIS IS THE KEY LINE
    res.render("admin/video_list", { videos });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading videos");
  }
});


// ==============================
// ADMIN – DELETE VIDEO
// ==============================
// ADMIN – DELETE VIDEO
router.get("/videos/delete/:id", async (req, res) => {
  try {
    await VideoPost.findByIdAndDelete(req.params.id);
    res.redirect("/admin/videos");
  } catch (err) {
    res.status(500).send("Delete failed");
  }
});










module.exports = router;
