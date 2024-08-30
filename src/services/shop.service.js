const httpStatus = require("http-status");
const { Shop } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

/***** Shop service methods *****/

// Function to create new shop
/**
 * Create a shop
 *  - check if the shop with the shopNo already exists using `Shop.isShopNoTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, ShopNo already taken”
 *  - Otherwise, create and return a new Shop object
 *
 * @param {Object} shopBody
 * @returns {Promise<Shop>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "tenantName": "john Snow",
 *  "shopNo": "s-25"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
const createShop = async (newShop) => {
    const { tenantName, shopNo } = newShop;

    // check if shopNo is unique
    const isShopNoTaken = await Shop.isShopNoTaken(shopNo);

    if (isShopNoTaken) {
        throw new ApiError(httpStatus.OK, `${shopNo} already taken`);
    } else {
        try {
            const newPost = await Shop.create(newShop);
            return newPost;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
};

/**
 * Fetches shop for a admin/super-admin
 * - Fetch shop from Mongo
 * - If shop doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "Shop does not exist"
 *
 * @param {Shop id} id
 * @returns {Promise<Shop>}
 * @throws {ApiError}
 */
const getShopById = async (id) => {
    try {
        let getShop = await Shop.findById(id);
        if (getShop) return getShop;

        throw new ApiError(httpStatus.NOT_FOUND, "Shop does not exist");
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

/**
 * Fetches all shops for a admin/super-admin
 * - Fetch all shops from Mongo
 *
 * @returns {Promise<Shops>}
 * @throws {ApiError}
 */
const getAllShops = async () => {
    try {
        let allShops = await Shop.find();
        return allShops;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

/**
 * Updates the shop with new shop object
 * - Fetch all shops from Mongo
 *
 * @param {Shop} updatedShop
 * @param {string} id
 * @returns {Promise<Shop>}
 * @throws {ApiError}
 */
const updateShop = async (updatedShop, id) => {
    try {
        let oldShop = await Shop.findById(id);
        if (oldShop) {
            oldShop.tenantName = updatedShop.tenantName;
            if (oldShop.shopNo != updatedShop.shopNo) {
                //it means shopNo of shop is to be updated
                // check if shopNo is unique
                const isShopNoTaken = await Shop.isShopNoTaken(
                    updatedShop.shopNo
                );

                if (isShopNoTaken) {
                    throw new ApiError(
                        httpStatus.OK,
                        `${updatedShop.shopNo} already taken`
                    );
                }
                oldShop.shopNo = updatedShop.shopNo;
            }

            await oldShop.save();

            return oldShop;
        }

        throw new ApiError(httpStatus.NOT_FOUND, "Shop does not exist");
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

/**
 * Delete Shop
 *
 * @param {string} id
 * @returns {null}
 * @throws {ApiError}
 */
const deletShop = async (id) => {
    try {
        const result = await Shop.deleteOne({ _id: id });
        console.log({ result });
        if (result.deletedCount === 1) return true;
        else throw new ApiError(httpStatus.NOT_FOUND, `shop not found`);
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};
module.exports = {
    createShop,
    getShopById,
    getAllShops,
    updateShop,
    deletShop,
};
