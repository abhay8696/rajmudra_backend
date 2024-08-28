const { Admin } = require("../models/admin.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

// Function getAdminByContact(contact)
/**
 * Get admin by email
 * - Fetch admin object from Mongo using the "contact" field and return admin object
 * @param {string} email
 * @returns {Promise<Admin>}
 */
const getAdminByContact = async (contact) => {
    let getAdmin = await Admin.findOne({ contact: contact });
    // console.log(getAdmin);
    if (getAdmin) return getAdmin;

    throw new ApiError(httpStatus.UNAUTHORIZED, "Admin not found");

    // try{
    //     let getUser = await User.findOne({email: email});
    //     return getUser;
    // }catch(err){
    //     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Email not found");
    // }
};

module.exports = { getAdminByContact };
