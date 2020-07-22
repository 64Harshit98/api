const route = require("express").Router();
const propertyModel = require("../../models/property.model");
const userModel = require("../../models/user.model");
const { propertyValidation } = require("../../middlewares/validators/propertyValidation");
const { verifyToken } = require("../../middlewares/auth/verifyToken");

/**
 * @swagger
 * paths:
 *  /api/property/add:
 *   post:
 *    tags:
 *    - "Property"
 *    summary: Use for property add
 *    requestBody:
 *     required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Property'
 *    responses:
 *     "201":
 *      description: successfully created property
 */
route.post("/add", verifyToken, async (req, res) => {
	if (req._id) {
		// Validating request body
		const { error, value } = propertyValidation(req.body);
		if (error) return res.status(400).send(error.details);

		try {
			// Changing usertype to propOwner if user is default
			if (req.userType == "tenant") {
				await userModel.findByIdAndUpdate(
					req._id,
					{
						$set: { userType: "propOwner" },
					},
					{ new: true }
				);
				console.log("User Type Updated");
			}
			// Saving the details in database
			const property = new propertyModel(value);
			const savedProperty = await property.save();

			res.status(201).send(savedProperty);
		} catch (error) {
			res.status(400).send(error);
		}
	} else {
		res.status(403).send("Forbidden | Login In");
	}
});

module.exports = route;
