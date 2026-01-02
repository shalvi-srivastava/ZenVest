const { Model, default: mongoose } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");
const PositionsModel = mongoose.model("Positions", PositionsSchema);
module.exports = { PositionsModel };
