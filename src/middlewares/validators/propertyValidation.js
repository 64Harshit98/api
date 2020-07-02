const Joi = require("@hapi/joi");
const addressSchema = require("./joiSchemas/addressSchema");
const propCharacteristicSchema = require("./joiSchemas/propCharacteristicSchema");
const contactInfoSchema = require("./joiSchemas/contactInfoSchema");
const propFacilitiesSchema = require("./joiSchemas/propFacilitiesSchema");
const roomDetailsSchema = require("./joiSchemas/roomDetailsSchema");

const propertyValidation = (data) => {
	// Define Schema to validate
	const schema = Joi.object({
		propName: Joi.string().required().min(3),
		gateClosing: Joi.string(),
		propType: Joi.string().required().min(2),
		tenantPreff: Joi.string().required(),
		tenantType: Joi.string().required(),
		// Address schema
		address: addressSchema,
		propCharacteristics: propCharacteristicSchema,
		propFacilities: propFacilitiesSchema,
		roomDetails: roomDetailsSchema,
		contactDetails: Joi.object({
			owner: contactInfoSchema.required(),
			manager: contactInfoSchema,
			company: contactInfoSchema,
		}),
		created: Joi.date(),
	});
	// Return value and error
	return schema.validate(data);
};

module.exports.propertyValidation = propertyValidation;
