const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   address:
 *    type: object
 *    required:
 *    - city
 *    - state
 *    - pincode
 *    properties:
 *     locality:
 *      type: String
 *     city:
 *      type: String
 *     state:
 *      type: String
 *     pincode:
 *      type: integer
 *      minLength: 6
 *      maxLength: 6
 *     location:
 *      type: object
 *      format: GeoJSON
 *      properties:
 *       Point:
 *        type: String
 *       cordinates:
 *        type: array
 *        items:
 *         type: integer
 */
const addressSchema = new mongoose.Schema({
	locality: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	pincode: {
		type: Number,
		minlength: 6,
		maxlength: 6,
	},
	location: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
});

module.exports = addressSchema;
