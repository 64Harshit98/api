const route = require("express").Router();
const bookingModel = require("../../models/booking.model");

/**
 * @swagger
 * path:
 *  /api/booking/confirm/{bookingId}:
 *   put:
 *    tags:
 *    - "Booking"
 *    summary: for approving a booking request by property owner
 *    parameters:
 *     - in: path
 *       name: bookingId
 *       required: true
 *    responses:
 *     '200':
 *       description: confirmed
 */
route.put("/confirm/:bookingId", async (req, res) => {
	// Checking Booking Exist
	try {
		const booking = await bookingModel.findOne({ _id: req.params.bookingId });
		if (booking) {
			// Updating the value and setting to true
			try {
				booking.set({ confirmed: true });
				booking.save();
				res.status(200).send(booking);
			} catch (error) {
				res.status(408).send(error);
			}
		} else {
			res.status(404).send("Not Found");
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

/**
 * @swagger
 * path:
 *  /api/booking/pay/{bookingId}:
 *   put:
 *    tags:
 *    - "Booking"
 *    summary: for paying to confirm a booking after owner has confirmed availability
 *    parameters:
 *     - in: path
 *       name: bookingId
 *       required: true
 *    responses:
 *     '200':
 *       description: confirmed
 */
route.put("/pay/:bookingId", async (req, res) => {
	// Checking booking exists
	try {
		const booking = await bookingModel.findOne({ _id: req.params.bookingId });

		if (booking.confirmed === true) {
			// Updating the value and setting to true
			try {
				booking.set({ paid: { status: true, at: Date.now() } });
				booking.save();
				res.status(200).send(booking);
			} catch (error) {
				res.status(408).send(error);
			}
		} else {
			res.status(404).send("Booking not confirmed");
		}
	} catch (error) {
		res.status(400).send(error);
	}
});
module.exports = route;
