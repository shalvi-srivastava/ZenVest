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

    // 1️⃣ Save order (user-specific)
    const newOrder = new OrdersModel({
      userId: req.user.userId,
      name,
      qty,
      price,
      mode,
    });
    await newOrder.save();

    // 2️⃣ Find holding for THIS USER ONLY
    let holding = await HoldingsModel.findOne({
      userId: req.user.userId,
      name,
    });

    if (mode === "BUY") {
      if (holding) {
        const totalQty = holding.qty + qty;
        const newAvg = (holding.qty * holding.avg + qty * price) / totalQty;

        holding.qty = totalQty;
        holding.avg = newAvg;
        holding.price = price;

        await holding.save();
      } else {
        await HoldingsModel.create({
          userId: req.user.userId,
          name,
          qty,
          avg: price,
          price,
        });
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
        await HoldingsModel.deleteOne({
          userId: req.user.userId,
          name,
        });
      } else {
        holding.qty = remainingQty;
        holding.price = price;
        await holding.save();
      }
    }

    res.json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("ORDER ERROR ❌", err);
    res.status(500).json({ error: "Order placement failed" });
  }
};
