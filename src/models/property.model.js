const mongoose = require("mongoose");
const addressSchema = require("./schemas/adress.schema");
/**
 * @swagger
 * components:
 *  schemas:
 *   Property:
 *    type: object
 *    required:
 *     - propName
 *     -
 *    properties:
 *     propName:
 *      type: String
 *     gateClosing:
 *      type: String
 *      format: time
 *     ownerId:
 *      type: String
 *      format: mongoDb _id
 *     managerId:
 *      type: String
 *      format: mongoDb _id
 *     propType:
 *      type: string
 *      description: It can be of type PG, Flat, Hostel, Coliving, Hotel
 *     tenantPreff:
 *      type: String
 *      description: Student, Working Professional, Both
 *     tenantType:
 *      type: String
 *      description: It can be Male, Female or Coliving
 *     propChar:
 *      type: object
 *     address:
 *      $ref: '#/components/schemas/address'
 *     ameneties:
 *      type: object
 *     photos:
 *      type: object
 *     created:
 *      type: String
 *      format: date
 */
const propertySchema = new mongoose.Schema({
	propName: {
		type: String,
	},
	gateClosing: {
		type: String,
		default: "None",
	},
	propType: {
		type: String,
		enum: ["PG", "Flat", "Hostel", "Coliving", "Hotel"],
	},
	tenantPreff: {
		type: String,
		enum: ["Student", "Working Professional", "Both"],
		default: "Both",
	},
	tenantType: {
		type: String,
		enum: ["Male", "Female", "Coliving"],
		default: "Coliving",
	},
	address: {
		type: addressSchema,
	},
	photos: {
		type: [String],
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

const propertyModel = mongoose.model("Property", propertySchema);
module.exports = propertyModel;
