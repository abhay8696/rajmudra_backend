const mongoose = require("mongoose");
const config = require("../config/config");
const { required } = require("joi");

// Mongoose schema for "Payment" collection
const PaymentSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Shops collection
        ref: "Shop",
        // required: true,
    },
    shopNo: {
        type: String, // Adding shopNo field to store the shop number
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
});

module.exports.Payment = mongoose.model("Payment", PaymentSchema);
