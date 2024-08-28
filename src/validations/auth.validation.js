const Joi = require("joi");
const { password } = require("./custom.validation");

/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 */
const register = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().custom(password, "custom validation").required(),
    }),
};

/***
 * Example url: `/v1/users/:userId`
* Validate the "userId" url *params* field. "userId" value should be a
* - string
* - valid Mongo id -> Use the helper function in src/validations/custom.validation.js

const getUser = {
 params: Joi.object().keys({
   userId: Joi.string().custom(objectId, "custom validation")
 }),
}; */
/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 */
const login = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().custom(password, "custom validation").required(),
    }),
};

module.exports = {
    register,
    login,
};
