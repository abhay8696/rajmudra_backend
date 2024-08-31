const { Admin } = require("../models/admin.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

/***** admin service methods *****/

// Function to create new admin
/**
 * Create a new admin
 *  - check if the admin with the contact already exists using `Admin.isContactTaken()` method
 *  - check if the admin with the email already exists using `Admin.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, contact/email already taken”
 *  - Otherwise, create and return a new Admin object
 *
 * @param {Object} adminBody
 * @returns {Promise<admin>}
 * @throws {ApiError}
 *
 * adminBody example:
 * {{
    "name": "Alice Smith",
    "email": "alice.smith#example.com",
    "contact": "0987654321",
    "password": "NewPassword456"
}
 * }
 *
 */
const createAdmin = async (newAdmin) => {
    const { email, contact } = newAdmin;
    try {
        // check if contact is unique
        const isContactTaken = await Admin.isContactTaken(contact);

        // check if email is unique
        const isEmailTaken = await Admin.isEmailTaken(email);

        if (isContactTaken || isEmailTaken) {
            let errName;
            isContactTaken ? (errName = contact) : (errName = email);
            throw new ApiError(httpStatus.OK, `${errName} already taken`);
        }

        const admin = await Admin.create(newAdmin);
        return admin;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

/**
 * Fetches admin for a admin/super-admin
 * - Fetch admin from Mongo
 * - If admin doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "admin does not exist"
 *
 * @param {Admin id} id
 * @returns {Promise<admin>}
 * @throws {ApiError}
 */
const getAdminById = async (id) => {
    try {
        let getAdmin = await Admin.findById(id);
        if (getAdmin) return getAdmin;

        throw new ApiError(httpStatus.NOT_FOUND, "admin does not exist");
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

// Function getAdminByContact(contact)
/**
 * Get admin by email
 * - Fetch admin object from Mongo using the "contact" field and return admin object
 * @param {string} email
 * @returns {Promise<Admin>}
 */
const getAdminByContact = async (contact) => {
    try {
        let getAdmin = await Admin.findOne({ contact: contact });
        // console.log(getAdmin);
        return getAdmin;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

module.exports = { createAdmin, getAdminById, getAdminByContact };
