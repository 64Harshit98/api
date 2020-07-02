const Joi = require("@hapi/joi");

const propFacilitiesSchema = Joi.object({
	food: Joi.object({
		meals: Joi.array().items(Joi.string()),
		cost: Joi.number(),
		diet: Joi.string(),
		info: Joi.string(),
	}),
	wifi: Joi.object({
		desc: Joi.string(),
		limit: Joi.number(),
		cost: Joi.number(),
	}),
	laundry: Joi.object({
		desc: Joi.string(),
		limit: Joi.string(),
		cost: Joi.number(),
	}),
	commonFacilities: Joi.array().items(Joi.string()),
	sportsFacilities: Joi.array().items(Joi.string()),
	security: Joi.array().items(Joi.string()),
});

module.exports = propFacilitiesSchema;
