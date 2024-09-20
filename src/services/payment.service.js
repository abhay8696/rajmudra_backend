const httpStatus = require("http-status");
const { Shop, Payment } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

/***** Payment service methods *****/

// Function to create new payment
/**
 * Create a payment
 *  - check if the shop with the shopNo exists
 *  - If not throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, ShopNo does not exist”
 *  - Otherwise, create and return a new Payment object
 *
 * @param {Object} shopBody
 * @returns {Promise<Shop>}
 * @throws {ApiError}
 *
 * paymentBody example:
 * {
 * "amount" = 500,
 * "shopId" = '614b1b5f1a0b5c7d481c9f90',
 * "paymentMethod" = 'credit',
 * "date" = Date
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
const createPayment = async (paymentObject) => {
    const { amount, shopId, paymentMethod, date } = paymentObject;
    try {
        //find shop
        const getShop = await Shop.findById(shopId);

        if (!getShop) throw new ApiError(httpStatus.OK, "Shop does not exist");

        const newPayment = await Payment.create(paymentObject);

        // Update the shop's payment history
        await Shop.findByIdAndUpdate(shopId, {
            $push: { paymentHistory: newPayment._id }, // Add the payment ID to the shop's payment history
        });

        return newPayment;
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;

        throw new ApiError(code, error?.message || "Internal Server Error");
    }
};

module.exports = { createPayment };
