// routes/user.js
const express = require("express");
const User = require("../models/userModel");
const { FundsModel } = require("../models/FundsModel");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();
router.post("/signup", async (req, res) => {
  let createdUserId = null;

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists !" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    createdUserId = user._id;

    await FundsModel.create({
      userId: user._id,
    });

    res.status(201).json({ message: "User registered successfully !" });
  } catch (err) {
    // 🔁 rollback if user was created but funds failed
    if (createdUserId) {
      await User.deleteOne({ _id: createdUserId });
    }

    console.error("SIGNUP ERROR ❌", err);
    res.status(500).json({ message: "Signup failed, please try again" });
  }
});

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages[0] });
    }

    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
