const bookingModel = require("../../models/booking.model");
const { verifyToken } = require("../../middlewares/auth/verifyToken");

const route = require("express").Router();

/**
 * @swagger
 * path:
 *  /api/booking/prop/{propId}:
 *   get:
 *    tags:
 *    - "Booking"
 *    summary: for getting all the bookings for the given property
 *    parameters:
 *     - in: path
 *       name: propId
 *       required: true
 *    responses:
 *     '200':
 *       description: all bookins for the property
 */
route.get("/prop/:propId", async (req, res) => {
	// Checking for booking in the database
	const bookings = await bookingModel.find({ propId: req.params.propId });
	if (bookings) {
		res.status(200).send(bookings);
	} else {
		res.status(404).send("no bookings");
	}
});
/**
 * @swagger
 * path:
 *  /api/booking/user/{userId}:
 *   get:
 *    tags:
 *    - "Booking"
 *    summary: for getting all the bookings for the given user
 *    parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *    responses:
 *     '200':
 *       description: all bookins for the user
 */
route.get("/user/:userId", async (req, res) => {
	// Checking for booking in the database
	const bookings = await bookingModel.find({ userId: req.params.userId });
	if (bookings) {
		res.status(200).send(bookings);
	} else {
		res.status(404).send("no bookings");
	}
});
module.exports = route;
