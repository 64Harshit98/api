const route = require("express").Router();
const visitModel = require("../../models/visit.model");
const {
	visitValidation,
} = require("../../middlewares/validators/visitValidation");

/**
 * @swagger
 * path:
 *  /api/visit/schedule:
 *   post:
 *    tags:
 *    - "Visit"
 *    summary: for scheduling a visit later to be approved by property owner
 *    requestBody:
 *     description: we need property id, visit date and user id
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         userId:
 *          type: string
 *         selected:
 *          type: object
 *          properties:
 *           propId:
 *            type: string
 *           visitDate:
 *            type: date
 *     responses:
 *      '201':
 *        description: created
 */

route.post("/schedule", async (req, res) => {
	// Validating request body
	const { error, value } = visitValidation(req.body);
	if (error) return res.status(407).send(error);

	// Scheduling a visit
	const visit = new visitModel(value);
	try {
		const savedVisit = await visit.save();
		res.status(201).send(savedVisit);
	} catch (error) {
		res.status(407).setDefaultEncoding(error);
	}
});
module.exports = route;
