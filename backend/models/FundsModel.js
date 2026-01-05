const mongoose = require("mongoose");
const { fundsSchema } = require("../schemas/FundsSchema");

const FundsModel =
  mongoose.models.Fund || mongoose.model("Fund", fundsSchema);

module.exports = { FundsModel };
