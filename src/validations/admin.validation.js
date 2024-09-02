const Joi = require("joi");
const { objectId } = require("./custom.validation");

/**
 * Example url: `/v1/admin/:id`
 * Validate the "id" url *params* field. "id" value should be a
 * - string
 * - valid Mongo id -> Use the helper function in src/validations/custom.validation.js
 */
const getAdmin = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId, "custom validation"),
    }),
};

module.exports = { getAdmin };
