const route = require("express").Router();
const { userLoginValidation } = require("../../middlewares/validators/userValidation");
const userModel = require("../../models/user.model");
const firebaseapp = require("../../middlewares/firebase/firebaseapp");
const { sendEmailVerification } = require("../../middlewares/firebase/verificationEmail");
const { createToken } = require("../../middlewares/auth/createToken");

/**
 * @swagger
 * paths:
 *  /api/user/login:
 *   post:
 *    tags:
 *    - "User"
 *    summary: Use for users login using firebase email auth
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         email:
 *          type: string
 *          format: $email
 *         password:
 *          type: string
 *        example:
 *           email: fake@email.com
 *           password: testpassword
 *    responses:
 *     "201":
 *      description: successfully login user
 */
route.post("/login", async (req, res) => {
	// Validating using userLoginValidation of Joi
	const { error } = userLoginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check user in database
	const user = await userModel.findOne({ email: req.body.email }, "_id userType name");
	if (!user) return res.status(400).send("User not found");

	// Logging in using firebase
	try {
		const currentUser = await firebaseapp
			.auth()
			.signInWithEmailAndPassword(req.body.email, req.body.password);

		// console.info(currentUser.user);
		if (currentUser.user.emailVerified) {
			const token = await createToken(user);

			res.status(200).send("LoggedIn 👉 : \t" + token);
		} else {
			sendEmailVerification();

			res.status(401).send("Verify your email id!");
		}
	} catch (error) {
		console.error(error);
		res.status(408).send(error.message);
	}
});

module.exports = route;
