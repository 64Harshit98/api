const Joi = require("@hapi/joi");

const bookingValidation = (data) => {
	const schema = Joi.object({
		propId: Joi.string().required(),
		userId: Joi.string().required(),
		amount: Joi.number().required(),
	});
	return schema.validate(data);
};

module.exports.bookingValidation = bookingValidation;
