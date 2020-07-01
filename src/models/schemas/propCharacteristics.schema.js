const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   PropCharechteristics:
 *    type: object
 *    properties:
 *     description:
 *      type: String
 *     rules:
 *      type: String
 *     nearby:
 *      type: object
 *      description: this will have nearby offices, institutes and market
 *     distances:
 *      type: object
 *      description: this will be in Kms
 *      properties:
 *       railwayStation:
 *        type: integer
 *       busStand:
 *        type: integer
 *       isbt:
 *        type: integer
 *       airport:
 *        type: integer
 *       metroStation:
 *        type: integer
 *
 */

const propCharacteristicsSchema = new mongoose.Schema({
	description: {
		type: String,
	},
	rules: {
		type: String,
	},
	nearby: {
		offices: {
			type: Map,
			of: Number,
		},
		institutes: {
			type: Map,
			of: Number,
		},
		markets: {
			type: Map,
			of: Number,
		},
	},
	distances: {
		railwayStation: {
			type: Number,
		},
		busStand: {
			type: Number,
		},
		isbt: {
			type: Number,
		},
		airport: {
			type: Number,
		},
		metroStation: {
			type: Number,
		},
	},
});
module.exports = propCharacteristicsSchema;
