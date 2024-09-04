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
            throw new ApiError(httpStatus.CONFLICT, `${errName} already taken`);
        }

        const admin = await Admin.create(newAdmin);
        return admin;
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

/**
 * Fetches all admin for a admin/super-admin
 * - Fetch all admin from Mongo
 *
 * @returns {Promise<admin>}
 * @throws {ApiError}
 */
const getAllAdmins = async () => {
    try {
        let allAdmins = await Admin.find();
        return allAdmins;
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
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
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
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
        if (getAdmin) return getAdmin;

        throw new ApiError(httpStatus.NOT_FOUND, "admin does not exist");
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

/**
 * Updates the admin with new admin object
 * - Fetch all admins from Mongo
 *
 * @param {Admin} updatedAdmin
 * @param {string} id
 * @returns {Promise<Admin>}
 * @throws {ApiError}
 */
const updateAdmin = async (adminId, updateData) => {
    try {
        // If the update includes contact, check if it's already taken
        if (updateData.contact) {
            const isTaken = await Admin.isContactTaken(updateData.contact);
            if (isTaken) {
                throw new ApiError(
                    httpStatus.CONFLICT,
                    `Contact ${updateData.contact} is already taken.`
                );
            }
        }

        // If the update includes email, check if it's already taken
        if (updateData.email) {
            const isTaken = await Admin.isEmailTaken(updateData.email);
            if (isTaken) {
                throw new ApiError(
                    httpStatus.CONFLICT,
                    `Email ${updateData.email} is already taken.`
                );
            }
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(
            adminId,
            { $set: updateData },
            { new: true }
        );

        if (updatedAdmin) {
            return updatedAdmin;
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
        }
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};
/**
 * Delete Admin
 *
 * @param {string} id
 * @returns {null}
 * @throws {ApiError}
 */
const deleteAdmin = async (id) => {
    try {
        const result = await Admin.deleteOne({ _id: id });
        // console.log({ result });
        if (result.deletedCount === 1) return true;
        else throw new ApiError(httpStatus.NOT_FOUND, `Admin not found`);
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};
module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    getAdminByContact,
    updateAdmin,
    deleteAdmin,
};
