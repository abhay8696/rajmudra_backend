const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { shopService } = require("../services");

/**
 * Create new Shop
 *
 * Example response:
 * HTTP 201 Created
 *  OBJECT: {
        "_id": "66d20cc42171142aaa6bc907",
        "tenantName": "Jake Peralta",
        "shopNo": "s-01",
        "__v": 0
    }
 *
 */
const createShop = catchAsync(async (req, res) => {
    const create = await shopService.createShop(req.body);

    res.status(httpStatus.CREATED).send(create);
});

/**
 * Fetch the shop details by id
 *
 * Example response:
 * HTTP 200 OK
 *  OBJECT: {
        "_id": "66d20cc42171142aaa6bc907",
        "tenantName": "Jake Peralta",
        "shopNo": "s-01",
        "__v": 0
    }
 *
 */
const getShop = catchAsync(async (req, res) => {
    const shop = await shopService.getShopById(req.params.id);

    res.status(httpStatus.OK).send(shop);
});

/**
 * Fetch all the shops
 *
 * Example response:
 * HTTP 200 OK
 *  ARRAY: [
 *      OBJECT: {
            "_id": "66d20cc42171142aaa6bc907",
            "tenantName": "Jake Peralta",
            "shopNo": "s-01",
            "__v": 0
        },
 *      OBJECT: {
            "_id": "66d20cc42171142aaa6bc907",
            "tenantName": "Jake Peralta",
            "shopNo": "s-01",
            "__v": 0
        },
        ...
 * ]
 *
 */
const getAllShops = catchAsync(async (req, res) => {
    // console.log(req.params);
    const allShops = await shopService.getAllShops();

    res.status(httpStatus.OK).send(allShops);
});

/**
 * Update the shop details by id
 *
 * Example response:
 * HTTP 202 Accepted
 *  OBJECT: {
        "_id": "66d20cc42171142aaa6bc907",
        "tenantName": "Jake Peralta",
        "shopNo": "s-01",
        "__v": 0
    }
 *
 */
const updateShop = catchAsync(async (req, res) => {
    // console.log(req.params);
    const shop = await shopService.updateShop(req.params.id, req.body);

    res.status(httpStatus.ACCEPTED).send(shop);
});

/**
 * Delete shop by id
 *
 * Example response:
 * HTTP 200 Ok
 *
 */
const deleteShop = catchAsync(async (req, res) => {
    await shopService.deletShop(req.params.id);

    res.status(httpStatus.OK).send({ message: "Shop deleted successfully!" });
});

module.exports = { getShop, createShop, getAllShops, updateShop, deleteShop };
