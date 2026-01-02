const mongoose = require("mongoose");

const WatchListSchema = new mongoose.Schema({
  name: String,
  price: Number,
  percent: String,
  isDown: Boolean,
});
module.exports = { WatchListSchema };
