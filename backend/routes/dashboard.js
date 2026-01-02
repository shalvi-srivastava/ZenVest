const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
// const { HoldingsModel } = require("../models/HoldingsModel");
const {
  fetchHoldings,
  fetchPositions,
  fetchOrders,
  newOrder,
} = require("../controllers/dashboard");
router.route("/holdings").get(wrapAsync(fetchHoldings));
router.route("/positions").get(wrapAsync(fetchPositions));
router.route("/orders").get(wrapAsync(fetchOrders));
router.route("/newOrder").post(wrapAsync(newOrder));
module.exports = router;
