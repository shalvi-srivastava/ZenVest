const { Model, default: mongoose } = require("mongoose");
const { ordersSchema, fundsSchema } = require("../schemas/FundsSchema");
const FundsModel = mongoose.model("Fund", fundsSchema);
module.exports = { FundsModel };
