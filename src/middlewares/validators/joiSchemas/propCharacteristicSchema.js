const Joi = require("@hapi/joi");

const propCharacteristicSchema = Joi.object({
	description: Joi.string().max(300),
	rules: Joi.string(),
	nearby: Joi.object({
		offices: Joi.any(),
		institutes: Joi.any(),
		markets: Joi.any(),
	}),
	distances: Joi.object({
		railwayStation: Joi.number(),
		busStand: Joi.number(),
		isbt: Joi.number(),
		airport: Joi.number(),
		metroStation: Joi.number(),
	}),
});

module.exports = propCharacteristicSchema;
