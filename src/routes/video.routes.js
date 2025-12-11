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















module.exports = router;
