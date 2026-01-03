const mongoose = require("mongoose");

const fundsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    totalBalance: {
      type: Number,
      required: true,
      default: 0,
    },

    investedAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    availableBalance: {
      type: Number,
      required: true,
      default: function () {
        return this.totalBalance - this.investedAmount;
      },
    },
  },
  { timestamps: true }
);

module.exports = { fundsSchema };
