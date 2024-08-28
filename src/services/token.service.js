const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

/**
 * Function to generate jwt token
 * - Payload must contain fields
 * --- "sub": `adminId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} adminId - Mongo admin id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (adminId, expires, type, secret = config.jwt.secret) => {
    const paylodad = {
        sub: adminId,
        type: type,
        iat: Math.floor(Date.now() / 1000),
        exp: expires,
    };

    // const options = { exp: expires };

    return jwt.sign(paylodad, secret);
};

/**
 * Function to generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {Admin} admin
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
const generateAuthTokens = async (admin) => {
    const currentTimeInSec = Math.floor(new Date() / 1000); //Date return time in milliseconds, divide by 1000 to get in seconds
    const tokenValidityInSec = 4 * 60 * 60;
    const expirationTimeFromNow = currentTimeInSec + tokenValidityInSec;

    const token = generateToken(
        admin._id,
        expirationTimeFromNow * 1000,
        tokenTypes.ACCESS,
        config.jwt.secret
    );

    return {
        access: {
            token,
            expires: new Date(expirationTimeFromNow * 1000),
        },
    };
};

module.exports = {
    generateToken,
    generateAuthTokens,
};
