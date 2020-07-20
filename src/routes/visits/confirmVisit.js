const route = require("express").Router();
const visitModel = require("../../models/visit.model");

/**
 * @swagger
 * path:
 *  /api/visit/confirm/{visitId}:
 *   put:
 *    tags:
 *    - "Visit"
 *    summary: for approving a visit request by property owner
 *    parameters:
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
route.put("/confirm/:visitId", async (req, res) => {
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
				visit.overwrite({ selected: selectArray });
				visit.save();
				res.status(200).send(visit);
			} catch (error) {
				res.status(400).send(error);
			}
		}
		res.status(404).send("Not Found");
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
 *     - in: path
 *       name: visitId
 *       required: true
 *    responses:
 *     '200':
 *       description: confirmed
 */
route.put("/pay/:visitId", async (req, res) => {
	// Find the visit
	try {
		const visit = await visitModel.findOne({ _id: req.params.visitId });
		// Paying for the visit
		if (visit.paid == false) {
			try {
				visit.set({ paid: true });
				visit.save();
				res.status(200).send(visit);
			} catch (error) {
				res.status(400).send(error);
			}
		}
		res.status(400).send("Already Paid");
	} catch (error) {
		res.status(400).send(error);
	}
});
module.exports = route;
