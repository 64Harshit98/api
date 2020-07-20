const Joi = require("@hapi/joi");

const selectedSchema = Joi.object({
	propId: Joi.string().required(),
	visitDate: Joi.date(),
});
const visitValidation = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required(),
		selected: Joi.array().items(selectedSchema),
		amount: Joi.number().required(),
	});
	return schema.validate(data);
};
module.exports.visitValidation = visitValidation;
