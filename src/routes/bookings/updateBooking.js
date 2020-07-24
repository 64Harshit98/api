const route = require("express").Router();
const bookingModel = require("../../models/booking.model");
const { verifyToken } = require("../../middlewares/auth/verifyToken");

/**
 * @swagger
 * path:
 *  /api/booking/cancel/{bookingId}:
 *   put:
 *    tags:
 *    - "Booking"
 *    summary: for cancelling a booking request by user
 *    parameters:
 *     - in: path
 *       name: bookingId
 *       required: true
 *     - in: header
 *       name: auth
 *       required: true
 *    requestBody:
 *     description:  reason
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         reason:
 *          type: string
 *    responses:
 *     '201':
 *       description: cancelled
 */
route.put("/cancel/:bookingId", verifyToken, async (req, res) => {
	// Check booking Exists
	try {
		const booking = await bookingModel.findOne({ _id: req.params.bookingId });

		if (booking.paid.status === false && booking.userId == req._id) {
			booking.set({ cancelled: { status: true, reason: req.body.reason } });
			booking.save();
			res.status(201).send(booking);
		} else {
			res.status(404).send("Not found | Paid contact owner");
		}
	} catch (error) {
		res.status(400).send(error);
	}
});
/**
 * @swagger
 * path:
 *  /api/booking/notavailable/{bookingId}:
 *   put:
 *    tags:
 *    - "Booking"
 *    summary: for cancelling a booking request by property owner
 *    parameters:
 *     - in: path
 *       name: bookingId
 *       required: true
 *     - in: header
 *       name: auth
 *       required: true
 *    requestBody:
 *     description: propId
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         propId:
 *          type: string
 *    responses:
 *     '201':
 *       description: cancelled
 */
route.put("/notavailable/:bookingId", verifyToken, async (req, res) => {
	// Authorizing property owner
	if (req.userType != "propOwner" || req.userType != "admin")
		return res.status(403).send(" Forbidden");
	// Check booking Exists
	try {
		const booking = await bookingModel.findOne({ _id: req.params.bookingId });

		if (booking.propId == req.body.propId) {
			booking.set({ cancelled: { status: true, reason: "Not Available" } });
			booking.save();
			res.status(201).send(booking);
		} else {
			res.status(404).send("Not found Paid contact owner");
		}
	} catch (error) {
		res.status(400).send(error);
	}
});
module.exports = route;
