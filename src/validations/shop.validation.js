const Joi = require("joi");

const shopValidation = Joi.object({
    ownerName: Joi.string().required(),
    shopNo: Joi.string().required(),
    registrationNo: Joi.string().required(),
    ownerContact: Joi.string().required(),
    ownerAddress: Joi.string().required(),
    ownerAdhaar: Joi.string().required(),
    rentAgreement: Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
    }).required(),
    tenure: Joi.number().required(),
    monthlyRent: Joi.string().required(),
    ownerPhoto: Joi.string().required(),
    ownerAdhaarPhoto: Joi.string().required(),
});

module.exports = { shopValidation };
