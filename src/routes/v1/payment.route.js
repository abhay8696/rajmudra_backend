const express = require("express");
const validate = require("../../middlewares/validate");
const { paymentController } = require("../../controllers");
const auth = require("../../middlewares/auth");
// const { paymentValidation } = require("../../validations/payment.validation");

const router = express.Router();

// Create a new payment
router.post("/new", auth, paymentController.createPayment);

// Get a payments by condition
router.get(
    "/condition/:key/:val",
    auth,
    paymentController.getPaymentByCondition
);

// Get payment by id
router.get("/:id", auth, paymentController.getPaymentById);

// Update a specific shop by ID
router.put("/:id", auth, paymentController.updatePayment);

// Delete a specific payment by ID
router.delete("/:id", auth, paymentController.deletePayment);

module.exports = router;
