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
 *  "ownerName": "john Snow",
 *  "shopNo": "s-25"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
const createShop = async (newShop) => {
    const { ownerName, shopNo, registrationNo } = newShop;

    try {
        //check if registration no is unique
        const isTaken = await Shop.isRegistrationNoTaken(registrationNo);
        if (isTaken) {
            throw new ApiError(
                httpStatus.CONFLICT,
                `Registration number ${registrationNo} is already taken.`
            );
        }

        // check if shopNo is unique
        const isShopNoTaken = await Shop.isShopNoTaken(shopNo);
        if (isShopNoTaken) {
            throw new ApiError(httpStatus.CONFLICT, `${shopNo} already taken`);
        }

        const newPost = await Shop.create(newShop);
        return newPost;
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
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
        let shop;
        if (id === "all") shop = await Shop.find();
        else shop = await Shop.findById(id);
        console.log(shop);

        if (!shop) {
            throw new ApiError(httpStatus.NOT_FOUND, "Shop does not exist");
        }
        return shop;
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
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
const updateShop = async (shopId, updateData) => {
    try {
        // If the update includes shopNo, check if it's already taken
        if (updateData.shopNo) {
            const isTaken = await Shop.isShopNoTaken(updateData.shopNo);
            if (isTaken) {
                throw new ApiError(
                    httpStatus.CONFLICT,
                    `Shop number ${updateData.shopNo} is already taken.`
                );
            }
        }

        // If the update includes registrationNo, check if it's already taken
        if (updateData.registrationNo) {
            const isTaken = await Shop.isRegistrationNoTaken(
                updateData.registrationNo
            );
            if (isTaken) {
                throw new ApiError(
                    httpStatus.CONFLICT,
                    `Registration number ${updateData.registrationNo} is already taken.`
                );
            }
        }
        const updatedShop = await Shop.findByIdAndUpdate(
            shopId,
            { $set: updateData },
            { new: true }
        );

        if (updatedShop) {
            return updatedShop;
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Shop not found");
        }
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
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
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};
module.exports = {
    createShop,
    getShopById,
    updateShop,
    deletShop,
};
