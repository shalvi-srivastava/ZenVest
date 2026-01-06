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

// ---------------- DB ----------------
async function main() {
  await mongoose.connect(mongoUrl);
}
main()
  .then(() => console.log("MongoDB connection successful !"))
  .catch((err) => console.log("MongoDB connection failed !",err));

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- API ROUTES ----------------
app.use("/auth", authRouter);
app.use("/dashboard/api", dashboardRouter);
app.use("/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  res.send("ZenVest backend is live 🚀");
});

// // ---------------- FRONTEND SERVING ----------------

// // ✅ DASHBOARD FIRST (MOST SPECIFIC)
// // Dashboard static
// app.use(
//   "/dashboard",
//   express.static(path.join(__dirname, "../frontend/dashboard/dist"))
// );



// // Landing static
// app.use(express.static(path.join(__dirname, "../frontend/landing/dist")));

// app.all("/*splat", (req, res, next) => {
//   next(new ExpressError(404, "PAGE NOT FOUND !"));
// });

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
