const router = require("express").Router();
const firebaseapp = require("../../middlewares/firebaseapp");
const userModel = require("../../models/user.model");
const {
	userRegisterValidation,
} = require("../../middlewares/validators/userValidation");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * paths:
 *  /api/user/register:
 *   get:
 *    tags:
 *    - "user"
 *    summary: To check inside user registratiopn
 *    responses:
 *     "200":
 *      description: In user registration
 */
router.get("/register", (req, res) => {
	res.status(200).send("In user Register 👤");
});

function sendEmailVerification() {
	// [START sendemailverification]
	firebaseapp
		.auth()
		.currentUser.sendEmailVerification()
		.then(function () {
			// Email Verification sent!
			// [START_EXCLUDE]
			console.info("Email Verification Sent!");
			// [END_EXCLUDE]
		});
	// [END sendemailverification]
}
/**
 * @swagger
 * paths:
 *  /api/user/register:
 *   post:
 *    tags:
 *    - "user"
 *    summary: Use for users registration using firebase email auth
 *    requestBody:
 *     required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *    responses:
 *     "201":
 *      description: successfully created user
 */
router.post("/register", async (req, res) => {
	// Valiadting the request using Joi userRegistrationValidation
	const { error } = userRegisterValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Checking if the user already exists
	const emailExist = await userModel.findOne({ email: req.body.email });
	if (emailExist) return res.status(409).send("Email already exists");

	// Hashing the password
	const salt = await bcrypt.genSalt(13);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	try {
		// SigningUp in firebase
		const currentUser = await firebaseapp
			.auth()
			.createUserWithEmailAndPassword(req.body.email, req.body.password);
		//  Sending verification email
		if (currentUser) {
			sendEmailVerification();
		}

		// Getting the firebase_id
		firebaseapp.auth().onAuthStateChanged((suser) => {
			if (suser) {
				// User logged in already or has just logged in.
				console.log(suser.uid);
				const user = new userModel({
					name: req.body.name,
					email: req.body.email,
					password: hashedPassword,
					firebase_id: suser.uid,
				});
				const savedUser = user.save();
				res.status(201).send("User Created ✔");
			}
		});
	} catch (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// [START_EXCLUDE]
		if (errorCode == "auth/weak-password") {
			console.error("The password is too weak.");
		} else {
			console.error(errorMessage);
		}
		console.error(error);
		// [END_EXCLUDE]
		res.status(500).send(error);
	}
});
module.exports = router;
