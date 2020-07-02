const Joi = require("@hapi/joi");

const staySchema = Joi.object({
	roomType: Joi.string(),
	price: Joi.number(),
	priceAC: Joi.number(),
	securityAmt: Joi.string(),
	bathroom: Joi.string(),
});

const roomDetailsSchema = Joi.object({
	amenities: Joi.array().items(Joi.string()),
	bathroomAmenities: Joi.array().items(Joi.string()),
	longStay: Joi.array().items(staySchema),
	shortStay: Joi.array().items(staySchema),
	extraAmenities: Joi.any(),
});

module.exports = roomDetailsSchema;
