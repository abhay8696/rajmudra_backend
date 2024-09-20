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

module.exports = { createPayment };
