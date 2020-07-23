const route = require("express").Router();
const visitModel = require("../../models/visit.model");
const { verifyToken } = require("../../middlewares/auth/verifyToken");

/**
 * @swagger
 * path:
 *  /api/visit/cancel/{visitId}/{userId}:
 *   put:
 *    tags:
 *    - "Visit"
 *    summary: cancelling a visit request
 *    parameters:
 *     - in: path
 *       name: visitId
 *       required: true
 *     - in: header
 *       name: auth
 *       required: true
 *    responses:
 *     '200':
 *       description: cancelled
 */
route.put("/cancel/:visitId", verifyToken, async (req, res) => {
	// Checking the visit exists
	try {
		const visit = await visitModel.findOne({ _id: req.params.visitId });
		if (visit.userId == req._id) {
			visit.set({ status: "Cancelled" });
			visit.save();
			res.status(200).send(visit);
		}
	} catch (error) {
		res.status(404).send(error);
	}
});
module.exports = route;
