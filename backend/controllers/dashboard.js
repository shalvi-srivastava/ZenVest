const { FundsModel } = require("../models/FundsModel");
const { HoldingsModel } = require("../models/HoldingsModel");
const { OrdersModel } = require("../models/OrdersModel");
module.exports.fetchHoldings = async (req, res) => {
  let allHoldings = await HoldingsModel.find({ userId: req.user.userId });
  res.json(allHoldings);
};

module.exports.fetchOrders = async (req, res) => {
  console.log("REQ.USER 👉", req.user);

  let allOrders = await OrdersModel.find({ userId: req.user.userId });
  res.json(allOrders);
};

module.exports.fetchFunds = async (req, res) => {
  const userId = req.user.userId;

  let funds = await FundsModel.findOne({ userId });

  if (!funds) {
    funds = await FundsModel.create({
      userId,
    });
  }

  res.json(funds);
};

module.exports.newOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    if (qty <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity and price must be positive" });
    }

    if (!["BUY", "SELL"].includes(mode)) {
      return res.status(400).json({ error: "Invalid order type" });
    }

    const userId = req.user.userId;
    const orderValue = qty * price;

    const funds = await FundsModel.findOne({ userId });
    if (!funds) {
      return res.status(400).json({ error: "Funds account not found" });
    }

    let holding = await HoldingsModel.findOne({ userId, name });

    // BUY FLOW
    if (mode === "BUY") {
      if (funds.availableBalance < orderValue) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // update funds
      funds.investedAmount += orderValue;
      funds.availableBalance -= orderValue;
      await funds.save();

      // update holdings
      if (holding) {
        const totalQty = holding.qty + qty;
        holding.avg = (holding.qty * holding.avg + qty * price) / totalQty;
        holding.qty = totalQty;
        holding.price = price;
        await holding.save();
      } else {
        await HoldingsModel.create({
          userId,
          name,
          qty,
          avg: price,
          price,
        });
      }
    }

    // SELL FLOW
    if (mode === "SELL") {
      if (!holding) {
        return res.status(400).json({ error: "No holdings available to sell" });
      }

      if (qty > holding.qty) {
        return res.status(400).json({ error: "Insufficient quantity" });
      }

      const remainingQty = holding.qty - qty;

      if (remainingQty === 0) {
        await HoldingsModel.deleteOne({ userId, name });
      } else {
        holding.qty = remainingQty;
        holding.price = price;
        await holding.save();
      }

      funds.investedAmount -= orderValue;
      funds.availableBalance += orderValue;
      await funds.save();
    }

    // SAVE ORDER LAST
    await OrdersModel.create({
      userId,
      name,
      qty,
      price,
      mode,
      status: "COMPLETED",
    });

    res.json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("ORDER ERROR ❌", err);
    res.status(500).json({ error: "Order placement failed" });
  }
};
