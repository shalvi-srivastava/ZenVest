const mongoose = require("mongoose");
const { FundsModel } = require("../models/FundsModel");
const { OrdersModel } = require("../models/OrdersModel");
const { HoldingsModel } = require("../models/HoldingsModel");
// const { PositionsModel } = require("../models/PositionsModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("deleteOne", { document: true }, async function () {
  const userId = this._id;

  await FundsModel.deleteOne({ userId });
  await OrdersModel.deleteMany({ userId });
  await HoldingsModel.deleteMany({ userId });
  // await PositionsModel.deleteMany({ userId });

});
userSchema.pre("findOneAndDelete", async function () {
  const user = await this.model.findOne(this.getQuery());
  if (!user) return next();

  const userId = user._id;

  await FundsModel.deleteOne({ userId });
  await OrdersModel.deleteMany({ userId });
  await HoldingsModel.deleteMany({ userId });
  // await PositionsModel.deleteMany({ userId });

});

module.exports = { userSchema };
