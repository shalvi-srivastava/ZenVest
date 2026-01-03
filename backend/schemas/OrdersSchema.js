const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "CANCELLED"],
      // default: "PENDING",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = { ordersSchema };
