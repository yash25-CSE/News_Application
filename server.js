const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
require("dotenv").config();
const path = require("path");


// EJS ENGINE
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HOME PAGE
app.get("/", (req, res) => {
  res.render("index");
});

// DB CONNECT
const connectDB = require("./src/config/db");
connectDB();

// ROUTES LOADING (ORDER MATTERS)
const adminRoutes = require("./src/routes/admin.routes");
app.use("/admin", adminRoutes);

const articleRoutes = require("./src/routes/article.routes");
app.use("/api/article", articleRoutes);

const videoRoutes = require("./src/routes/video.routes");
app.use("/api", videoRoutes);

const userRoutes = require("./src/routes/user.routes");
app.use("/", userRoutes);

// 💥 CURRENT AFFAIRS ROUTES (Correct now)
const currentAffairRoutes = require("./src/routes/current_affair.routes");
app.use("/admin", currentAffairRoutes);          // Admin form + submit
app.use("/api/current-affairs", currentAffairRoutes);  // API calls


const photoRoutes = require("./src/routes/photo.routes");
app.use("/", photoRoutes);

app.use("/uploads", express.static("uploads"));

const headlineRoutes = require("./src/routes/headline.routes");
app.use("/", headlineRoutes);



// SERVER START
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
