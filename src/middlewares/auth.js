const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const { jwtStrategy } = require("../config/passport");

/**
 * Custom callback function implementation to verify callback from passport
 * - If authentication failed, reject the promise and send back an ApiError object with
 * --- Response status code - "401 Unauthorized"
 * --- Message - "Please authenticate"
 *
 * - If authentication succeeded,
 * --- set the `req.admin` property as the admin object corresponding to the authenticated token
 * --- resolve the promise
 */
const verifyCallback = (req, resolve, reject) => async (err, admin, info) => {
    if (err) reject(new ApiError(httpStatus.UNAUTHORIZED, "admin not found"));

    // console.log({info, admin})
    if (admin) {
        req.admin = admin;
        resolve();
    } else
        reject(
            new ApiError(
                httpStatus.UNAUTHORIZED,
                "Please authenticate, try logging in again"
            )
        );
};

/**
 * Auth middleware to authenticate using Passport "jwt" strategy with sessions disabled and a custom callback function
 *
 */
const auth = async (req, res, next) => {
    passport.use("jwt", jwtStrategy);

    return new Promise((resolve, reject) => {
        return passport.authenticate(
            "jwt",
            { session: false },
            verifyCallback(req, resolve, reject)
        )(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

module.exports = auth;
