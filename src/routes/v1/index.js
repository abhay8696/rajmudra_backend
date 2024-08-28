const express = require("express");
//subs-routes
const adminRoute = require("./admin.route");

const router = express.Router();

router.use("/admins", adminRoute);

module.exports = router;
