const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   Visit:
 *    type: object
 *    required:
 *     - propId
 *     - userId
 *    properties:
 *     userId:
 *      type: String
 *      format: mongoDB
 *     selected:
 *      type: object
 *      properties:
 *       propId:
 *        type: string
 *       visitDate:
 *        type: date
 *       visitTime:
 *        type: time
 *       confirmed:
 *        type: boolean
 *     amount:
 *      type: integer
 *     paid:
 *      type: boolean
 *     status:
 *      type: string
 *     created:
 *      type: String
 *      format: date
 */

const selectedSchema = new mongoose.Schema(
	{
		propId: {
			type: String,
		},
		visitDate: {
			type: Date,
		},
		visitTime: {
			type: String,
		},
		confirmed: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false }
);
const visitSchema = new mongoose.Schema({
	userId: {
		type: String,
	},
	selected: [selectedSchema],
	amount: {
		type: Number,
	},
	paid: {
		type: Boolean,
		default: false,
	},
	status: {
		type: String,
		default: "Created",
		enum: ["Created", "Cancelled", "Done"],
	},
	created: {
		type: Date,
		default: Date.now(),
	},
});

const visitModel = mongoose.model("Visit", visitSchema);
module.exports = visitModel;
