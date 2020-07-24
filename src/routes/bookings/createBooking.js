const route = require("express").Router();
const bookingModel = require("../../models/booking.model");
const { bookingValidation } = require("../../middlewares/validators/bookingValidation");
const { verifyToken } = require("../../middlewares/auth/verifyToken");

/**
 * @swagger
 * path:
 *  /api/booking/create:
 *   post:
 *    tags:
 *    - "Booking"
 *    summary: for creating a booking request later to be approved by property owner
 *    parameters:
 *    - in: header
 *      name: auth
 *    requestBody:
 *     description: we only need property id
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         propId:
 *          type: string
 *         amount:
 *          type: integer
 *     responses:
 *      '201':
 *        description: created
 */
route.post("/create", verifyToken, async (req, res) => {
	// Authorizing User and gettin userId
	if (!req._id) return res.status(403).send("Forbidden");
	const varBooking = {
		userId: req._id,
		...req.body,
	};
	// Validating request body
	const { error, value } = bookingValidation(varBooking);
	if (error) return res.status(407).send(error);
	// Creating a booking
	const booking = new bookingModel(value);
	try {
		const savedBooking = await booking.save();
		res.status(201).send(savedBooking);
	} catch (error) {
		res.status(407).send(error);
	}
});
module.exports = route;
