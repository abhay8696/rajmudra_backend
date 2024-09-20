const express = require("express");
//subs-routes
const adminRoute = require("./admin.route");
const authRoute = require("./auth.route");
const shopRoute = require("./shop.route");
const paymentRoute = require("./payment.route");

const router = express.Router();

router.use("/admin", adminRoute);
router.use("/auth", authRoute);
router.use("/shop", shopRoute);
router.use("/payment", paymentRoute);

module.exports = router;
