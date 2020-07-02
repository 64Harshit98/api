const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   PropFacilities:
 *    type: object
 *    properties:
 *     food:
 *      type: object
 *      properties:
 *       meals:
 *        type: array
 *        description: Breakfast, Lunch, Snacks and dinner
 *       cost:
 *        type: integer
 *        description: cost per meal if any
 *       diet:
 *        type: string
 *        description: Non-Vegitarian, Vegitarian or Eggitarian
 *       info:
 *        type: String
 *        description: restrictions or inclusions in food if any
 *     wifi:
 *      type: object
 *      properties:
 *       desc:
 *        type: String
 *        description: details about rovider or wifi status
 *       limit:
 *        type: integer
 *        description: wifi limit if any PM
 *       cost:
 *        type: integer
 *        description: wifi cost if any PM
 *     laundry:
 *      type: object
 *      properties:
 *       desc:
 *        type: String
 *        description: what type of laundry is available
 *       limit:
 *        type: String
 *        description: how many clothes included PM
 *       cost:
 *        type: integer
 *        description: what is extra cost per cloth
 *     propFacilities:
 *      type: array
 *      items:
 *       type: String
 *     sportsFacilities:
 *      type: array
 *      items:
 *       type: String
 *     security:
 *      type: array
 *      items:
 *       type: String
 */
const propFacilitiesSchema = new mongoose.Schema({
	food: {
		meals: {
			type: [String],
			enum: ["Breakfast", "Lunch", "Snacks", "Dinner"],
		},
		cost: {
			type: Number,
		},
		diet: {
			type: String,
			enum: ["Non-Vegitarian", "Vegitarian", "Eggitarian"],
		},
		info: {
			type: String,
		},
	},
	wifi: {
		desc: {
			type: String,
		},
		limit: {
			type: Number,
		},
		cost: {
			type: Number,
		},
	},
	laundry: {
		desc: {
			type: String,
		},
		limit: {
			type: String,
		},
		cost: {
			type: Number,
		},
	},
	commonFacilities: {
		type: [String],
	},
	sportsFacilities: {
		type: [String],
	},
	security: {
		type: [String],
	},
});

module.exports = propFacilitiesSchema;
