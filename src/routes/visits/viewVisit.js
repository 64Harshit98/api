const route = require("express").Router();
const visitModel = require("../../models/visit.model");

/**
 * @swagger
 * path:
 *  /api/visit/viewScheduled/{userId}:
 *   get:
 *    tags:
 *    - "Visit"
 *    summary: for getting all the visits scheduled
 *    parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *    responses:
 *     '200':
 *       description: all visits for the user
 */
route.get("/viewScheduled/:userId", async (req, res) => {
	// Getting all the visits of the user
	try {
		const visits = await visitModel
			.find({ userId: req.params.userId })
			.select({ selected: 1, amount: 1, paid: 1, status: 1 });
		res.status(200).send(visits);
	} catch (error) {
		res.status(404).send(error);
	}
});

/**
 * @swagger
 * path:
 *  /api/visit/viewConfirmed/{propId}:
 *   get:
 *    tags:
 *    - "Visit"
 *    summary: for getting all the visits for the given property
 *    parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *    responses:
 *     '200':
 *       description: all visits for the property
 */
route.get("/viewConfirmed/:propId", async (req, res) => {
	// Getting all the visits of the user
	try {
		const visits = await visitModel
			.aggregate()
			.match({ "selected.propId": req.params.propId })
			.unwind("selected")
			.match({ "selected.propId": req.params.propId })
			.project({ selected: 1, status: 1 });
		res.status(200).send(visits);
	} catch (error) {
		res.status(404).send(error);
	}
});
module.exports = route;
