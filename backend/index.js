require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

const ExpressError = require("./utils/ExpressError.js");

const dashboardRouter = require("./routes/dashboard.js");
const authRouter = require("./routes/user.js");
const adminRouter = require("./routes/admin.js");

// ---------------- DB ----------------
async function main() {
  await mongoose.connect(mongoUrl);
}
main()
  .then(() => console.log("MongoDB connection successful !"))
  .catch((err) => console.log("MongoDB connection failed !", err));

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- API ROUTES ----------------
app.use("/auth", authRouter);
app.use("/dashboard/api", dashboardRouter);
app.use("/admin", adminRouter);

// --------- FRONTEND SERVING ----------

// Dashboard static
app.use(
  "/dashboard",
  express.static(path.join(__dirname, "../frontend/dashboard/dist"))
);

// ✅ Dashboard SPA fallback (EXCLUDES /dashboard/api)
app.get(/^\/dashboard(?!\/api)(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard/dist/index.html"));
});

// Landing static
app.use(express.static(path.join(__dirname, "../frontend/landing/dist")));

// Landing SPA fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/landing/dist/index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  console.error(err);
  res.status(statusCode).send(`${statusCode} - ${message}`);
});
// ---------------- START ----------------
app.listen(port, () => {
  console.log("server running on port", port);
});
