const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const PhotoPost = require("../models/PhotoPost");

// Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/photos");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ADMIN FORM PAGE
router.get("/admin/photos", (req, res) => {
    res.render("admin/upload_photos");
});

// ADMIN — SAVE PHOTO POST
router.post("/admin/photos/publish", upload.single("photoFile"), async (req, res) => {
    try {
        const { title, article, imageUrl, tags } = req.body;

        const tagList = tags ? tags.split(",").map(t => t.trim()) : [];

        await PhotoPost.create({
            title,
            article,
            imageUrl,
            imageFile: req.file ? "/uploads/photos/" + req.file.filename : null,
            tags: tagList
        });

        res.send("Photo + Article Uploaded Successfully!");
    } catch (err) {
        res.status(500).send("Upload Error: " + err.message);
    }
});


// USER — SHOW ALL PHOTOS
router.get("/photose", async (req, res) => {
    try {
        const posts = await PhotoPost.find().sort({ createdAt: -1 });
        res.render("user/photos_list", { posts });
    } catch (err) {
        res.status(500).send("Error loading photos");
    }
});

// USER — SINGLE PHOTO PAGE
router.get("/photo/:id", async (req, res) => {
    try {
        const post = await PhotoPost.findById(req.params.id);
        res.render("user/photo_single", { post });
    } catch (err) {
        res.status(500).send("Unable to load photo");
    }
});

// USER — POST COMMENT
router.post("/photo/:id/comment", async (req, res) => {
    try {
        const { user, message } = req.body;
        await PhotoPost.findByIdAndUpdate(req.params.id, {
            $push: { comments: { user, message } }
        });
        res.redirect(`/photo/${req.params.id}`);
    } catch (err) {
        res.status(500).send("Unable to add comment");
    }
});

module.exports = router;
