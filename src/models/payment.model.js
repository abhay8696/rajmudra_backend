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
    shop: {
        type: Schema.Types.ObjectId, // Reference to the Shops collection
        ref: "Shop",
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
});

module.exports.Payment = mongoose.model("Payment", PaymentSchema);
