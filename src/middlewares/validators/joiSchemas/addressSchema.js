const Joi = require("@hapi/joi");

// For initial creation
const addressSchema = Joi.object({
	locality: Joi.string(),
	city: Joi.string().required(),
	state: Joi.string().required(),
	pincode: Joi.number().min(100000).max(999999),
	landmark: Joi.string(),
	location: Joi.object({
		type: Joi.string().required(),
		coordinates: Joi.array().items(Joi.number()).required(),
	}),
});

// For general address
const addressGeneralSchema = Joi.object({
	locality: Joi.string(),
	city: Joi.string(),
	state: Joi.string(),
	pincode: Joi.number().min(100000).max(999999),
	landmark: Joi.string(),
	location: Joi.object({
		type: Joi.string(),
		coordinates: Joi.array().items(Joi.number()),
	}),
});

module.exports = { addressSchema, addressGeneralSchema };
