const mongoose = require("mongoose");
const { array } = require("@hapi/joi");

/**
 * @swagger
 * components:
 *  schemas:
 *   RoomDetails:
 *    type: object
 *    required:
 *    properties:
 *     amenities:
 *      type: array
 *     bathroomAmenities:
 *      type: array
 *     longStay:
 *      type: object
 *      properties:
 *       sharingType:
 *        type: String
 *       price:
 *        type: integer
 *       priceAC:
 *        type: integer
 *       securityAmt:
 *        type: integer
 *       bathroom:
 *        type: array
 *        descripiton: It can be attached or common washroom
 *     shortStay:
 *      type: object
 *      properties:
 *       roomType:
 *        type: String
 *       price:
 *        type: integer
 *       bathroom:
 *        type: array
 *        descripiton: It can be attached or common washroom
 *     extraAmenities:
 *      type: object
 *      description: this will consist of price and name of any extra amenity/ies
 */

const staySchema = mongoose.Schema(
	{
		roomType: {
			type: String,
		},
		price: {
			type: Number,
		},
		priceAC: {
			type: Number,
		},
		securityAmt: {
			type: String,
		},
		bathroom: {
			type: String,
		},
	},
	{ _id: false }
);

const roomDetailsSchema = new mongoose.Schema(
	{
		amenities: {
			type: [String],
		},
		bathroomAmenities: {
			type: [String],
		},
		longStay: [staySchema],
		shortStay: [staySchema],
		extraAmenities: {
			type: Map,
			of: Number,
		},
	},
	{ _id: false }
);

module.exports = roomDetailsSchema;
