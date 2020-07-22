const mongoose = require("mongoose");
const shortid = require("shortid");

// Importing sub Schemas
const addressSchema = require("./schemas/adress.schema");
const contactInfoSchema = require("./schemas/contactInfo.schema");
const propCharacteristicsSchema = require("./schemas/propCharacteristics.schema");
const propFacilitiesSchema = require("./schemas/propFacilities.schema");
const roomDetailsSchema = require("./schemas/roomDetails.schema");

/**
 * @swagger
 * components:
 *  schemas:
 *   Property:
 *    type: object
 *    required:
 *     - propName
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
 *     address:
 *      $ref: '#/components/schemas/Address'
 *     photos:
 *      type: array
 *     propCharacteristics:
 *      $ref: '#/components/schemas/PropCharechteristics'
 *     propFacilities:
 *      $ref: '#/components/schemas/PropFacilities'
 *     roomdetails:
 *      $ref: '#/components/schemas/RoomDetails'
 *     contactDetails:
 *      type: object
 *      properties:
 *       owner:
 *        $ref: '#/components/schemas/ContactInfo'
 *       manager:
 *        $ref: '#/components/schemas/ContactInfo'
 *       company:
 *        $ref: '#/components/schemas/ContactInfo'
 *     published:
 *      type: boolean
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
	stayCode: {
		type: String,
		default: `#Stay ${shortid.generate().substr(0, 3).toUpperCase()}${Date.now()
			.toString()
			.substr(10)}`,
	},
	address: addressSchema,
	photos: {
		type: [String],
	},
	propCharacteristics: propCharacteristicsSchema,
	propFacilities: propFacilitiesSchema,
	roomDetails: roomDetailsSchema,
	contactDetails: {
		owner: contactInfoSchema,
		manager: contactInfoSchema,
		company: contactInfoSchema,
	},
	ownerId: {
		type: String,
	},
	userAccess: {
		type: [String],
	},
	published: {
		type: Boolean,
		default: false,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

const propertyModel = mongoose.model("Property", propertySchema);
module.exports = propertyModel;
