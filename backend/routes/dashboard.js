const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const authMiddleware = require("../middleware");
// const { HoldingsModel } = require("../models/HoldingsModel");
const {
  fetchHoldings,
  fetchPositions,
  fetchOrders,
  fetchFunds,
  newOrder,
} = require("../controllers/dashboard");
router.route("/orders").get(authMiddleware, wrapAsync(fetchOrders));
router.route("/holdings").get(authMiddleware, wrapAsync(fetchHoldings));
// router.route("/positions").get(authMiddleware, wrapAsync(fetchPositions));
router.route("/funds").get(authMiddleware, wrapAsync(fetchFunds));
router.route("/newOrder").post(authMiddleware, wrapAsync(newOrder));

module.exports = router;
