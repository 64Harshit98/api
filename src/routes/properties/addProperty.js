const route = require("express").Router();
const propertyModel = require("../../models/property.model");
const {
	propertyValidation,
} = require("../../middlewares/validators/propertyValidation");

/**
 * @swagger
 * paths:
 *  /api/property/add:
 *   get:
 *    tags:
 *    - "Property"
 *    summary: To check inside Property add
 *    responses:
 *     "200":
 *      description: In Property add
 */
route.get("/add", (req, res) => {
	res.status(200).send("Inside add property 🏠");
});

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
route.post("/add", async (req, res) => {
	// Validating request body
	const { error, value } = propertyValidation(req.body);
	if (error) return res.status(400).send(error.details);
	//else return res.status(200).send(value);
	// Saving the details in database
	const property = new propertyModel(req.body);
	const savedProperty = await property.save();

	res.status(201).send(savedProperty);
});

module.exports = route;
