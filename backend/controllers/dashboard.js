const { FundsModel } = require("../models/FundsModel");
const { HoldingsModel } = require("../models/HoldingsModel");
const { OrdersModel } = require("../models/OrdersModel");
// const { PositionsModel } = require("../models/PositionsModel");
module.exports.fetchHoldings = async (req, res) => {
  let allHoldings = await HoldingsModel.find({ userId: req.user.userId });
  res.json(allHoldings);
};
// module.exports.fetchPositions = async (req, res) => {
//   let allPositions = await PositionsModel.find({ userId: req.user.userId });
//   res.json(allPositions);
// };
module.exports.fetchOrders = async (req, res) => {
  console.log("REQ.USER 👉", req.user);

  let allOrders = await OrdersModel.find({ userId: req.user.userId });
  res.json(allOrders);
};

module.exports.fetchFunds = async (req, res) => {
  let funds = await FundsModel.findOne({ userId: req.user.userId });
  res.json(funds);
};
module.exports.newOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    console.log("REQ BODY 👉", req.body);

    // 1️⃣ Save order
    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    // 2️⃣ Find existing holding
    let holding = await HoldingsModel.findOne({ name });

    if (mode === "BUY") {
      if (holding) {
        // weighted average calculation
        const totalQty = holding.qty + qty;
        const newAvg = (holding.qty * holding.avg + qty * price) / totalQty;

        holding.qty = totalQty;
        holding.avg = newAvg;
        holding.price = price; // latest price

        await holding.save();
      } else {
        // first time buy
        const newHolding = new HoldingsModel({
          name,
          qty,
          avg: price,
          price,
        });

        await newHolding.save();
      }
    }

    if (mode === "SELL") {
      if (!holding) {
        return res.status(400).json({ error: "No holdings available to sell" });
      }

      if (qty > holding.qty) {
        return res.status(400).json({ error: "Insufficient quantity" });
      }

      const remainingQty = holding.qty - qty;

      if (remainingQty === 0) {
        // sold everything
        await HoldingsModel.deleteOne({ name });
      } else {
        holding.qty = remainingQty;
        holding.price = price;
        await holding.save();
      }
    }

    res.json({ message: "Order placed & holdings updated successfully" });
  } catch (err) {
    console.error("ORDER ERROR ❌", err);
    res.status(500).json({ error: "Order placement failed" });
  }
};
