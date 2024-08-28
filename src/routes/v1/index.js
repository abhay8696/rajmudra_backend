const express = require("express");
//subs-routes
const adminRoute = require("./admin.route");
const authRoute = require("./auth.route");

const router = express.Router();

router.use("/admins", adminRoute);
router.use("/auth", authRoute);

module.exports = router;
