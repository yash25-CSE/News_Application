const express = require("express");
const router = express.Router();

const User = require("../models/User");

// ADMIN LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("admin/login", { error: null });
});

// ADMIN LOGIN LOGIC
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, role: "admin" });

  if (!admin) {
    return res.render("admin/login", { error: "Admin not found" });
  }

if (password !== admin.password) {
  return res.render("admin/login", { error: "Invalid password" });
}


  // ✅ login success → dashboard
  res.redirect("/admin/layout");
});

// ADMIN DASHBOARD
router.get("/layout", (req, res) => {
  res.render("admin/layout", { pageTitle: "Dashboard" });
  
});

router.get("/write_article", (req, res) => {
  res.render("admin/write_article");
});

// UPLOAD VIDEO PAGE
router.get("/upload_video", (req, res) => {
  res.render("admin/upload_video");
});

// Current Affairs PAGE
router.get("/current_affairs", (req, res) => {
  res.render("admin/current_affairs");
});

// Uplode Photos
router.get("/upload_photos", (req, res) => {
  res.render("admin/upload_photos");
});

//Uplode Headline
router.get("/upload_headline", (req, res) => {
  res.render("admin/upload_headline");
});

//Video List list
router.get("/video_list", (req, res) => {
  res.render("admin/video_list");
});

//Headline List list
router.get("/headline_list", (req, res) => {
  res.render("admin/headline_list");
});















module.exports = router;
