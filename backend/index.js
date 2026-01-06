require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

// DB
mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connection successful !"))
  .catch(err => console.error(err));

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", require("./routes/user"));
app.use("/dashboard/api", require("./routes/dashboard"));
app.use("/admin", require("./routes/admin"));

// ✅ health check
app.get("/", (req, res) => {
  res.status(200).send("ZenVest backend is live 🚀");
});

// ❌ NO SPA FALLBACK
// ❌ NO STATIC FILES

app.listen(port, () => {
  console.log("server running on port", port);
});
