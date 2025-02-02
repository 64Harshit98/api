const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   Address:
 *    type: object
 *    required:
 *    - location
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
const addressSchema = new mongoose.Schema(
	{
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
		landmark: {
			type: String,
		},
		location: {
			type: {
				type: String,
				default: "Point",
				enum: ["Point"],
			},
			coordinates: {
				type: [Number],
			},
		},
	},
	{ _id: false }
);

module.exports = addressSchema;
