const mongoose = require("mongoose");
const config = require("../config/config");

// Mongoose schema for "shop" collection
const ShopSchema = mongoose.Schema(
    {
        ownerName: {
            type: String,
            required: true,
        },
        shopNo: {
            type: String,
            required: true,
            unique: true,
        },
        registrationNo: {
            type: String,
            required: true,
            unique: true,
        },
        ownerContact: {
            type: String,
            required: true,
        },
        ownerAddress: {
            type: String,
            required: true,
        },
        ownerAdhaar: {
            type: String,
            required: true,
        },
        rentAgreement: {
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
        },
        tenure: {
            type: Number,
            required: true,
        },
        monthlyRent: {
            type: String,
            required: true,
        },
        ownerPhoto: {
            type: String,
            required: true,
        },
        ownerAdhaarPhoto: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false,
    }
);

/**
 * Check if shopNo is taken
 * @param {string} shopNo - The shop's shopNo
 * @returns {Promise<boolean>}
 */
ShopSchema.statics.isShopNoTaken = async function (shopNo) {
    let result = await this.findOne({ shopNo: shopNo });
    return !!result;
};

/**
 * Check if registrationNo is taken
 * @param {string} registrationNo - The shop's registrationNo
 * @returns {Promise<boolean>}
 */
ShopSchema.statics.isRegistrationNoTaken = async function (registrationNo) {
    let result = await this.findOne({ registrationNo: registrationNo });
    return !!result;
};

/**
 * @typedef Shop
 */
const Shop = mongoose.model("Shop", ShopSchema);

module.exports.Shop = Shop;
