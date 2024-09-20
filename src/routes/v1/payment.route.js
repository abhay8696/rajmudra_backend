const express = require("express");
const validate = require("../../middlewares/validate");
const { paymentController } = require("../../controllers");
const auth = require("../../middlewares/auth");
// const { paymentValidation } = require("../../validations/payment.validation");

const router = express.Router();

// Create a new payment
router.post("/new", auth, paymentController.createPayment);

module.exports = router;
