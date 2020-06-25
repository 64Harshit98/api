const route = require("express").Router();
const propertyModel = require("../../models/property.model");
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
	// Saving the details in database
	const property = new propertyModel(req.body);
	const savedProperty = await property.save();

	res.status(201).send(savedProperty);
});

module.exports = route;
