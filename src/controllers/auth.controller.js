const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, tokenService } = require("../services");
/**
 * Function performs the following steps:
 * -  Call the authservice to verify is password and email is valid
 * -  Generate auth tokens
 * -  Send back
 * --- "200 OK" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "super-admin-1",
 *      "contact": "0123456789",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const login = catchAsync(async (req, res) => {
    const { contact, password } = req.body;
    // find admin from authService
    const findAdmin = await authService.loginWithContactAndPassword(
        contact,
        password
    );
    // generate token
    const token = await tokenService.generateAuthTokens(findAdmin);

    res.status(httpStatus.OK).send({ admin: findAdmin, tokens: token });
});

module.exports = {
    login,
};
