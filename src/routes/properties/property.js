const route = require("express").Router();
const propertyModel = require("../../models/property.model");

/**
 * @swagger
 * paths:
 *  /api/property/all:
 *   get:
 *    tags:
 *    - "Property"
 *    summary: To get all the properties
 *    responses:
 *     "200":
 *      description: retun the properties data like propName ,propType,staycode ,address
 */
route.get("/all", async (req, res) => {
	try {
		const properties = await propertyModel.find({}).select({
			propName: 1,
			propType: 1,
			staycode: 1,
			address: 1,
		});
		res.status(200).send(properties);
	} catch (error) {
		res.status(400).send(error);
	}
});

/**
 * @swagger
 * paths:
 *  /api/property/{propId}:
 *   get:
 *    tags:
 *    - "Property"
 *    summary: To get the property with the given id
 *    parameters:
 *    - in: path
 *      name: propId
 *      required: true
 *    responses:
 *     "200":
 *      description: retun the desired property
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Property'
 */
route.get("/:propId", async (req, res) => {
	try {
		const property = await propertyModel
			.findOne({ _id: req.params.propId })
			.select({ contactDetails: 0 });
		res.status(200).send(property);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = route;
