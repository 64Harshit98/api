const Joi = require("@hapi/joi");
const { number } = require("@hapi/joi");

const userRegisterValidation = (data) => {
	// Define Schema to validate
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(6).required(),
		phone: Joi.number().min(10),
	});
	return schema.validate(data);
};

const userLoginValidation = (data) => {
	// Define Schema to validate
	const schema = Joi.object({
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(data);
};

const userProfileValidation = (data) => {
	// Define Schema to validate
	const schema = Joi.object({
		name: Joi.string(),
		email: Joi.string().min(5).email(),
		password: Joi.string().min(6),
		phone: Joi.number().min(10),
		userType: Joi.string(),
		companyName: Joi.string(),
	});
	return schema.validate(data);
};

module.exports.userRegisterValidation = userRegisterValidation;
module.exports.userLoginValidation = userLoginValidation;
module.exports.userProfileValidation = userProfileValidation;
