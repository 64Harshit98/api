const { verifyToken } = require("../../middlewares/auth/verifyToken");
const propertyModel = require("../../models/property.model");
const { propertyUpdateValidation } = require("../../middlewares/validators/propertyValidation");

const route = require("express").Router();

/**
 * @swagger
 * paths:
 *  /api/property/{propId}:
 *   put:
 *    tags:
 *    - "Property"
 *    summary: Use for updating the property with the specific userId add the adress with coordinates
 *    parameters:
 *     - in: path
 *       name: propId
 *       required: true
 *     - in: header
 *       name: auth
 *       required: true
 *    requestBody:
 *     required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Property'
 *    responses:
 *     "201":
 *      description: successfully updated the property and return it
 */
route.put("/:propId", verifyToken, async (req, res) => {
	// Can be Updated by Property Owner or Admin
	if (req.userType == "tenant" || req.body.ownerId) return res.status(403).send("Forbidden");
	const { error } = propertyUpdateValidation(req.body);
	if (error) return res.status(40).send(error.details[0].message);

	try {
		const property = await propertyModel.findOne({ _id: req.params.propId });
		property.set(req.body);
		property.save();
		res.status(201).send("Property details Updated 🏠");
	} catch (error) {
		res.status(408).send(error);
	}
});

/**
 * @swagger
 * paths:
 *  /api/property/publish/{propId}:
 *   put:
 *    tags:
 *    - "Property"
 *    summary: Use for publishing the property by the admin
 *    parameters:
 *     - in: path
 *       name: propId
 *       required: true
 *     - in: header
 *       name: auth
 *       required: true
 *    responses:
 *     "201":
 *      description: successfully Published
 */
route.put("/publish/:propId", verifyToken, async (req, res) => {
	// Can be Updated by Property Owner or Admin
	if (req.userType != "admin") return res.status(403).send("Forbidden");

	try {
		const property = await propertyModel.findOne({ _id: req.params.propId });
		property.set({ published: true });
		property.save();
		res.status(201).send("Property Published 🏠");
	} catch (error) {
		res.status(408).send(error);
	}
});

/**
 * @swagger
 * paths:
 *  /api/property/unpublish/{propId}:
 *   put:
 *    tags:
 *    - "Property"
 *    summary: Use for unpublishing the property by the admin
 *    parameters:
 *     - in: path
 *       name: propId
 *       required: true
 *     - in: header
 *       name: auth
 *       required: true
 *    responses:
 *     "201":
 *      description: successfully UnPublished
 */
route.put("/publish/:propId", verifyToken, async (req, res) => {
	// Can be Updated by Property Owner or Admin
	if (req.userType != "admin") return res.status(403).send("Forbidden");

	try {
		const property = await propertyModel.findOne({ _id: req.params.propId });
		property.set({ published: false });
		property.save();
		res.status(201).send("Property UnPublished 🏠");
	} catch (error) {
		res.status(408).send(error);
	}
});
/**
 * @swagger
 * paths:
 *  /api/property/{propId}:
 *   delete:
 *    tags:
 *    - "Property"
 *    summary: To delete the property with the given id
 *    responses:
 *     "200":
 *      description: retun the property deleted
 */

module.exports = route;
