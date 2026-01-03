

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👈 IMPORTANT
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

// const mongoose = require("mongoose");
// require("dotenv").config();

// const User = require("./models/userModel");
// const { FundsModel } = require("./models/FundsModel");

// async function seedFunds() {
//   await mongoose.connect(process.env.MONGO_URL);

//   const users = await User.findMany({});

//   for (let user of users) {
//     const existingFund = await FundsModel.findOne({ userId: user._id });

//     if (!existingFund) {
//       await FundsModel.create({
//         userId: user._id,
//         totalBalance: 50000,
//         investedAmount: 0,
//         availableBalance: 50000,
//       });

//       console.log(`Funds created for user ${user._id}`);
//     } else {
//       console.log(`Funds already exist for user ${user._id}`);
//     }
//   }

//   mongoose.disconnect();
// }

// seedFunds();
