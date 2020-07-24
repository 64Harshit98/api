const route = require("express").Router();
const visitModel = require("../../models/visit.model");
const { verifyToken } = require("../../middlewares/auth/verifyToken");

/**
 * @swagger
 * path:
 *  /api/visit/confirm/{visitId}:
 *   put:
 *    tags:
 *    - "Visit"
 *    summary: For approving a visit request by property owner
 *    parameters:
 *     - in: header
 *       name: auth
 *       required: true
 *     - in: path
 *       name: visitId
 *       required: true
 *    requestBody:
 *     description: we need property id, visit date and time
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         propId:
 *          type: string
 *         visitDate:
 *          type: date
 *         visitTime:
 *          type: time
 *    responses:
 *     '200':
 *       description: confirmed
 */
route.put("/confirm/:visitId", verifyToken, async (req, res) => {
	// authorizing property owner
	if (req.userType == "tenant") return res.status(403).send("Forbidden");
	// Find the visit
	try {
		const visit = await visitModel.findOne({ _id: req.params.visitId });
		if (visit) {
			let selectArray = [];
			visit.selected.forEach((element) => {
				if (element.propId == req.body.propId) {
					selectArray.push({
						propId: req.body.propId,
						confirmed: true,
						visitTime: req.body.visitTime,
						visitDate: element.visitDate,
					});
				} else {
					selectArray.push(element);
				}
			});
			try {
				visit.set({ selected: selectArray });
				visit.save();
				res.status(200).send(visit);
			} catch (error) {
				res.status(400).send(error);
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
 *  /api/visit/pay/{visitId}:
 *   put:
 *    tags:
 *    - "Visit"
 *    summary: paying for a visit request
 *    parameters:
 *     - in: header
 *       name: auth
 *       required: true
 *     - in: path
 *       name: visitId
 *       required: true
 *    responses:
 *     '200':
 *       description: confirmed
 */
route.put("/pay/:visitId", verifyToken, async (req, res) => {
	// Find the visit
	try {
		const visit = await visitModel.findOne({ _id: req.params.visitId });

		if (visit.userId != req._id) return res.status(403).send(" Forbidden");
		// Paying for the visit
		if (visit.paid == false) {
			try {
				visit.set({ paid: true });
				visit.save();
				res.status(200).send(visit);
			} catch (error) {
				res.status(400).send(error);
			}
		} else {
			res.status(400).send("Already Paid | Not ");
		}
	} catch (error) {
		res.status(400).send(error);
	}
});
module.exports = route;
