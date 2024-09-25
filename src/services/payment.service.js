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
    const { amount, shopNo, paymentMethod, date } = paymentObject;
    try {
        //find shop
        const getShop = await Shop.find({ shopNo: shopNo });

        if (!getShop)
            throw new ApiError(
                httpStatus.NOT_FOUND,
                `Shop ${shopNo} does not exist`
            );
        if (!getShop.length)
            throw new ApiError(
                httpStatus.NOT_FOUND,
                `Shop ${shopNo} does not exist`
            );

        const newPayment = await Payment.create({
            ...paymentObject,
            shopId: getShop[0]._id,
        });

        // Update the shop's payment history
        await Shop.findByIdAndUpdate(getShop[0]._id, {
            $push: { paymentHistory: newPayment._id }, // Add the payment ID to the shop's payment history
        });

        return newPayment;
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;

        throw new ApiError(code, error?.message || "Internal Server Error");
    }
};

// Function to get payment by id
/**
 *
 *  - check if the payment with the id exists
 *  - If not throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, payment does not exist”
 *  - Otherwise, return a that Payment object
 *
 * @param {String} req.param.id
 * @returns {Promise<Payment>}
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
const getPaymentById = async (paymentId) => {
    try {
        let payment;
        if (paymentId == "all") payment = await Payment.find();
        else payment = await Payment.findById(paymentId);

        if (payment) return payment;

        throw new ApiError(
            httpStatus.NOT_FOUND,
            "Payment with this id does not exist"
        );
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;

        throw new ApiError(code, error?.message || "Internal Server Error");
    }
};

// Function to get payments by condition (amount, value) or (shop, value) or (paymentMedhod, value) or (datevalue)
/**
 *
 *  - fetch using Payment.find()
 *  - If not found return empty array
 *  - Otherwise, return array of Payment objects
 *
 * @param {String, String} req.params.key, req.params.value
 * @returns {Promise<Payment>}
 * @throws {ApiError}
 *
 * paymentBody example:
 *  [
 *      {
 *      "amount" = 500,
 *      "shopId" = '614b1b5f1a0b5c7d481c9f90',
 *      "paymentMethod" = 'credit',
 *      "date" = Date
 *      },
 *      {
 *      "amount" = 500,
 *      "shopId" = '614b1b5f1a0b5c7d481c9f90',
 *      "paymentMethod" = 'credit',
 *      "date" = Date
 *      }, ...
 *  ]
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
const getPaymentByCondition = async (key, val) => {
    try {
        let payments;

        payments = await Payment.find({ [key]: val });
        // console.log(payments);

        if (!payments) {
            throw new ApiError(httpStatus.NOT_FOUND, `Payments not found.`);
        }
        return payments;
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;

        throw new ApiError(code, error?.message || "Internal Server Error");
    }
};

/**
 * Updates the shop with new shop object
 * - Fetch all shops from Mongo
 *
 * @param {string} id
 * @param {Shop} updatedPayment
 * @returns {Promise<Shop>}
 * @throws {ApiError}
 */
const updatePayment = async (paymentId, updateData) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            paymentId,
            { $set: updateData },
            { new: true }
        );

        if (updatedPayment) {
            return updatedPayment;
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Payment not found");
        }
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;

        throw new ApiError(code, error?.message || "Internal Server Error");
    }
};

/**
 * Delete Payment
 *
 * @param {string} id
 * @returns {null}
 * @throws {ApiError}
 */
const deletePayment = async (id) => {
    try {
        const result = await Payment.deleteOne({ _id: id });

        if (result.deletedCount === 1) return true;
        else throw new ApiError(httpStatus.NOT_FOUND, `Payment not found`);
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error.message);
    }
};

module.exports = {
    createPayment,
    getPaymentById,
    getPaymentByCondition,
    updatePayment,
    deletePayment,
};
