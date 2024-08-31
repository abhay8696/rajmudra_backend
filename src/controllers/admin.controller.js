const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { adminService } = require("../services");

/**
 * Create new Admin
 *
 * Example response:
 * HTTP 201 Created
 *  OBJECT: {
        "_id": "66d20cc42171142aaa6bc907",
        "tenantName": "Jake Peralta",
        "AdminNo": "s-01",
        "__v": 0
    }
 *
 */
const createAdmin = catchAsync(async (req, res) => {
    const create = await adminService.createAdmin(req.body);

    res.status(httpStatus.CREATED).send(create);
});

/**
 * Fetch the admin details by id
 *
 * Example response:
 * HTTP 200 OK
 *  OBJECT: {
        "_id": "66d20cc42171142aaa6bc907",
        "tenantName": "Jake Peralta",
        "adminNo": "s-01",
        "__v": 0
    }
 *
 */
const getAdminById = catchAsync(async (req, res) => {
    const admin = await adminService.getAdminById(req.params.id);

    res.status(httpStatus.OK).send(admin);
});

/**
 * Fetch the admin details by contact
 *
 * Example response:
 * HTTP 200 OK
 *  OBJECT: {
        "_id": "66d20cc42171142aaa6bc907",
        "tenantName": "Jake Peralta",
        "adminNo": "s-01",
        "__v": 0
    }
 *
 */
const getAdminByContact = catchAsync(async (req, res) => {
    const admin = await adminService.getAdminByContact(req.body.contact);

    res.status(httpStatus.OK).send(admin);
});

module.exports = {
    createAdmin,
    getAdminById,
    getAdminByContact,
};
