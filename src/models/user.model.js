const mongoose = require("mongoose");

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *           type: string
 *          email:
 *           type: string
 *           format: email
 *           description: Email for the user, needs to be unique.
 *          firebase_id:
 *           type: string
 *           description: generated by firebase server
 *          usertype:
 *           type: string
 *           description: the user type can be tenant, owner, admin
 *          phone:
 *           type: integer
 *           minlength: 10
 *          profileURL:
 *           type: string
 *           format: urlstring
 *          created:
 *           type: string
 *           format: date
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 *           password: testpassword
 */
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		min: 5,
		max: 255,
		// unique: true,
	},
	firebase_id: {
		type: String,
		unique: true,
	},
	userType: {
		type: String,
		enum: ["tenant", "propOwner", "admin"],
		default: "tenant",
	},
	phone: {
		type: Number,
		min: 10, // unique: true,
	},
	profileImageURL: {
		type: String,
	},
	companyName: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});
const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
