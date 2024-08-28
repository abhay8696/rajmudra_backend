const httpStatus = require("http-status");
const adminService = require("./admin.service");
const ApiError = require("../utils/ApiError");

const { Admin } = require("../models/admin.model");

/**
 * Login with contact and password
 * - Utilize adminService method to fetch admin object corresponding to the email provided
 * - Use the Admin schema's "isPasswordMatch" method to check if input password matches the one admin registered with (i.e, hash stored in MongoDB)
 * - If admin doesn't exist or incorrect password,
 * throw an ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 * - Else, return the admin object
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithContactAndPassword = async (contact, password) => {
    // return {contact, password}

    const getAdmin = await adminService.getAdminByContact(contact);

    if (!getAdmin) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Incorrect contact or password"
        );
    }

    const passwordMatch = await getAdmin.isPasswordMatch(password); //function in admin.model.js

    if (!getAdmin || !passwordMatch) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Incorrect contact or password"
        );
    }

    return getAdmin;
};

module.exports = {
    loginWithContactAndPassword,
};
