const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   Booking:
 *    type: object
 *    required:
 *     - propId
 *     - userId
 *    properties:
 *     propId:
 *      type: string
 *      format: mongoDB
 *     userId:
 *      type: string
 *      format: mongoDB
 *     amount:
 *      type: integer
 *     confirmed:
 *      type: boolean
 *     cancelled:
 *      type: object
 *      properties:
 *       status:
 *        type: boolean
 *       reason:
 *        type: string
 *     paid:
 *      type: object
 *      properties:
 *       status:
 *        type: boolean
 *       at:
 *        type: Date
 *        description: time and date of payment
 *     created:
 *      type: string
 *      format: date
 */

const bookingSchema = new mongoose.Schema({
	propId: {
		type: String,
	},
	userId: {
		type: String,
	},
	amount: {
		type: Number,
	},
	confirmed: {
		type: Boolean,
		default: false,
	},
	cancelled: {
		status: {
			type: Boolean,
		},
		reason: {
			type: String,
		},
	},
	paid: {
		status: {
			type: Boolean,
			default: false,
		},
		at: {
			type: Date,
		},
	},
	created: {
		type: Date,
		default: Date.now(),
	},
});

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
