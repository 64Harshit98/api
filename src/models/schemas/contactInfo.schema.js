const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   ContactInfo:
 *    type: object
 *    properties:
 *     name:
 *      type: String
 *     pContact:
 *      type: integer
 *      description: primary contact number
 *     sContact:
 *      type: integer
 *      description: secondary contact number
 *     email:
 *      type: String
 *      format: email
 *     adress:
 *      type: String
 */
const contactInfoSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	pContact: {
		type: Number,
		minlength: 10,
		maxlength: 15,
	},
	sContact: {
		type: Number,
		minlength: 10,
		maxlength: 15,
	},
	email: {
		type: String,
		min: 5,
	},
	address: {
		type: String,
	},
	// Address
});

module.exports = contactInfoSchema;
