const route = require("express").Router();
const { userLoginValidation } = require("../../middlewares/validators/userValidation");
const userModel = require("../../models/user.model");
const firebaseapp = require("../../middlewares/firebase/firebaseapp");

/**
 * @swagger
 * paths:
 *  /api/user/login:
 *   get:
 *    tags:
 *    - "user"
 *    summary: To check inside user login
 *    responses:
 *     "200":
 *      description: In user login
 */
route.get("/login", (req, res) => {
	res.status(200).send("In user login 🗝");
});

// Verification email
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
 *  /api/user/login:
 *   post:
 *    tags:
 *    - "user"
 *    summary: Use for users login using firebase email auth
 *    requestBody:
 *     required: true
 *    content:
 *     application/json:
 *    responses:
 *     "201":
 *      description: successfully login user
 */
route.post("/login", async (req, res) => {
	// Validating using userLoginValidation of Joi
	const { error } = userLoginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check user in database
	const user = await userModel.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("User not found");

	// Logging in using firebase
	try {
		const currentUser = await firebaseapp
			.auth()
			.signInWithEmailAndPassword(req.body.email, req.body.password);

		//console.info(currentUser.user);
		if (currentUser.user.emailVerified) {
			res.status(201).send(user);
		} else {
			sendEmailVerification();
			res.status(401).send("Verify your email id!");
		}
	} catch (error) {
		var errorMessage = error.message;
		console.error(error);
		res.status(500).send(error);
	}
});

module.exports = route;
