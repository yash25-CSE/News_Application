const express = require("express");
const router = express.Router();
const CurrentAffair = require("../models/CurrentAffair");

// ADMIN FORM PAGE
router.get("/current-affairs", (req, res) => {
    res.render("admin/current_affairs");
});

// SAVE DATA
router.post("/current-affairs/publish", async (req, res) => {
    try {
        const { headline, article, imageUrl, videoUrl, tags } = req.body;

        const tagArr = tags ? tags.split(",").map(t => t.trim()) : [];

        await CurrentAffair.create({
            headline,
            article,
            imageUrl,
            videoUrl,
            tags: tagArr
        });

        res.send("Current Affair Published Successfully!");
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

// USER VIEW ALL CURRENT AFFAIRS
router.get("/", async (req, res) => {
    try {
        const list = await CurrentAffair.find().sort({ createdAt: -1 });
        res.render("user/current_affairs_list", { list });
    } catch (err) {
        res.status(500).send("Error loading current affairs");
    }
});

// USER VIEW SINGLE CURRENT AFFAIR
router.get("/:id", async (req, res) => {
    try {
        const item = await CurrentAffair.findById(req.params.id);
        if (!item) return res.send("Not Found");

        res.render("user/current_affair_single", { item });
    } catch (err) {
        res.status(500).send("Error");
    }
});

module.exports = router;
