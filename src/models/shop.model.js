const mongoose = require("mongoose");
const config = require("../config/config");

// Mongoose schema for "shop" collection
const ShopSchema = mongoose.Schema(
    {
        tenantName: {
            type: String,
            required: true,
        },
        shopNo: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: false,
    }
);

/**
 * Check if shopNo is taken
 * @param {string} shopNo - The user's shopNo
 * @returns {Promise<boolean>}
 */
ShopSchema.statics.isShopNoTaken = async function (shopNo) {
    let result = await this.findOne({ shopNo: shopNo });
    return !!result;
};

/**
 * @typedef Shop
 */
const Shop = mongoose.model("Shop", ShopSchema);

module.exports.Shop = Shop;
