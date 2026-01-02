require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

const dashboardRouter = require("./routes/dashboard.js");
const authRouter = require("./routes/user.js");

// ---------------- DB ----------------
async function main() {
  await mongoose.connect(mongoUrl);
}
main()
  .then(() => console.log("MongoDB connection successful !"))
  .catch(() => console.log("MongoDB connection failed !"));

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- API ROUTES ----------------
app.use("/auth", authRouter);
app.use("/dashboard/api", dashboardRouter);

// ---------------- FRONTEND SERVING ----------------

// ✅ DASHBOARD FIRST (MOST SPECIFIC)
// Dashboard static
// Dashboard static
app.use(
  "/dashboard",
  express.static(path.join(__dirname, "../frontend/dashboard/dist"))
);

// Dashboard SPA fallback
app.get(/^\/dashboard(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard/dist/index.html"));
});

// Landing static
app.use(express.static(path.join(__dirname, "../frontend/landing/dist")));

// Landing SPA fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/landing/dist/index.html"));
});

// ---------------- START ----------------
app.listen(port, () => {
  console.log("server running on port", port);
});
