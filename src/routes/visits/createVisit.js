const route = require("express").Router();
const visitModel = require("../../models/visit.model");
const { visitValidation } = require("../../middlewares/validators/visitValidation");
const { verifyToken } = require("../../middlewares/auth/verifyToken");

/**
 * @swagger
 * path:
 *  /api/visit/schedule:
 *   post:
 *    tags:
 *    - "Visit"
 *    summary: for scheduling a visit later to be approved by property owner
 *    parameters:
 *    - in: header
 *      name: auth
 *      required: true
 *    requestBody:
 *     description: we need property id and visit date
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         selected:
 *          type: object
 *          properties:
 *           propId:
 *            type: string
 *           visitDate:
 *            type: date
 *         amount:
 *          type: integer
 *     responses:
 *      '201':
 *        description: created
 */

route.post("/schedule", verifyToken, async (req, res) => {
	// Authorizing user
	if (!req._id) return res.status(403).send("Forbidden");

	// Creating visit
	const varVisit = {
		userId: req._id,
		...req.body,
	};

	// Validating request body
	const { error, value } = visitValidation(varVisit);
	if (error) return res.status(407).send(error);

	// Scheduling a visit
	const visit = new visitModel(value);
	try {
		const savedVisit = await visit.save();
		res.status(201).send(savedVisit);
	} catch (error) {
		res.status(408).send(error);
	}
});
module.exports = route;
