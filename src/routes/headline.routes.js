const express = require("express");
const router = express.Router();
const Headline = require("../models/Headline");

// ADMIN → upload form
router.get("/admin/headlines", (req, res) => {
    res.render("admin/upload_headline");
});

// ADMIN → submit headline
router.post("/admin/headlines/publish", async (req, res) => {
    try {
        const { title, summary, imageUrl, status } = req.body;

        await Headline.create({
            title,
            summary,
            imageUrl,
            status: status === "published" ? "published" : "draft"
        });

        res.send("Headline Published Successfully!");
    } catch (error) {
        res.status(500).send("Error publishing headline: " + error.message);
    }
});

// USER SIDE → get all published headlines
router.get("/headlines", async (req, res) => {
    try {
        const headlines = await Headline.find({ status: "published" })
            .sort({ createdAt: -1 });

        res.render("user/headline_list", { headlines });
    } catch (error) {
        res.status(500).send("Error loading headlines");
    }
});

module.exports = router;
