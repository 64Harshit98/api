const Joi = require("@hapi/joi");

const contactInfoSchema = Joi.object({
	name: Joi.string(),
	pContact: Joi.number(),
	sContact: Joi.number(),
	email: Joi.string().email(),
	address: Joi.string(),
});

module.exports = contactInfoSchema;
