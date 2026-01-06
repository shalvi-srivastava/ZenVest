const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

router.delete("/user/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne(); 
  res.json({ message: "User and all related data deleted" });
});

module.exports = router;
