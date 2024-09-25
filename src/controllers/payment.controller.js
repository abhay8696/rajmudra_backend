const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { paymentService } = require("../services");

/**
 * Create new Payment
 *
 * Example response:
 * HTTP 201 Created
 *  OBJECT: {
 *      "amount": 500,
 *      "shopId": "66eb26425518d4715f531fb8",
 *      "paymentMethod": "credit",
 *      "_id": "66edd2b0e39dde8878b0b408",
 *      "date": "2024-09-20T19:53:20.611Z",
 *      "__v": 0
 *      }
 */
const createPayment = catchAsync(async (req, res) => {
    const create = await paymentService.createPayment(req.body);

    res.status(httpStatus.CREATED).send(create);
});

/**
 * get Payment by id
 *
 * Example response:
 * HTTP 201 Created
 *  OBJECT: {
 *      "amount": 500,
 *      "shopId": "66eb26425518d4715f531fb8",
 *      "paymentMethod": "credit",
 *      "_id": "66edd2b0e39dde8878b0b408",
 *      "date": "2024-09-20T19:53:20.611Z",
 *      "__v": 0
 *      }
 */
const getPaymentById = catchAsync(async (req, res) => {
    const payment = await paymentService.getPaymentById(req.params.id);

    res.status(httpStatus.OK).send(payment);
});

/**
 * get Payments by condition
 *
 * Example response:
 * HTTP 201 Created
 * Array: [
 *      OBJECT: {
 *          "amount": 500,
 *          "shopId": "66eb26425518d4715f531fb8",
 *          "paymentMethod": "credit",
 *          "_id": "66edd2b0e39dde8878b0b408",
 *          "date": "2024-09-20T19:53:20.611Z",
 *          "__v": 0
 *          }
 * ]
 */
const getPaymentByCondition = catchAsync(async (req, res) => {
    const payments = await paymentService.getPaymentByCondition(
        req.params.key,
        req.params.val
    );

    res.status(httpStatus.OK).send(payments);
});

/**
 * update Payment
 *
 * Example response:
 * HTTP 201 Created
 *  OBJECT: {
 *      "amount": 500,
 *      "shopId": "66eb26425518d4715f531fb8",
 *      "paymentMethod": "credit",
 *      "_id": "66edd2b0e39dde8878b0b408",
 *      "date": "2024-09-20T19:53:20.611Z",
 *      "__v": 0
 *      }
 */
const updatePayment = catchAsync(async (req, res) => {
    // console.log(req.params);
    const payment = await paymentService.updatePayment(req.params.id, req.body);

    res.status(httpStatus.ACCEPTED).send(payment);
});

/**
 * Delete Payment by id
 *
 * Example response:
 * HTTP 200 Ok
 *
 */
const deletePayment = catchAsync(async (req, res) => {
    await paymentService.deletePayment(req.params.id);

    res.status(httpStatus.OK).send({
        message: "Payment deleted successfully!",
    });
});

module.exports = {
    createPayment,
    getPaymentById,
    getPaymentByCondition,
    updatePayment,
    deletePayment,
};
