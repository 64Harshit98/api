const route = require("express").Router();
const bookingModel = require("../../models/booking.model");
const {
	bookingValidation,
} = require("../../middlewares/validators/bookingValidation");

/**
 * @swagger
 * path:
 *  /api/booking/create:
 *   post:
 *    tags:
 *    - "Booking"
 *    summary: for creating a booking request later to be approved by property owner
 *    requestBody:
 *     description: we only need property id and user id
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         userId:
 *          type: string
 *         propId:
 *          type: string
 *     responses:
 *      '201':
 *        description: created
 */
route.post("/create", async (req, res) => {
	// Validating request body
	const { error } = bookingValidation(req.body);
	if (error) return res.status(407).send(error);
	// Creating a booking
	const booking = new bookingModel(req.body);
	try {
		const savedBooking = await booking.save();
		res.status(201).send(savedBooking);
	} catch (error) {
		res.status(407).send(error);
	}
});
module.exports = route;
