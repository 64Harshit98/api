const route = require("express").Router();
const userModel = require("../../models/user.model");
const firebaseapp = require("../../middlewares/firebaseapp");

/**
 * @swagger
 * paths:
 *  /api/user/passwordreset/{userId}:
 *   put:
 *    tags:
 *    - "user"
 *    summary: Use for reseting the password with userId
 *    parameters:
 *     - in: path
 *       name: userId
 *    responses:
 *     "200":
 *      description: user password reset email sent
 */
route.put("/passwordreset/:userId", async (req, res) => {
	//Checking if user exist
	const user = await userModel.findOne({ _id: req.params.userId });
	// console.log(user);
	if (user) {
		// Send email for password reset
		firebaseapp
			.auth()
			.sendPasswordResetEmail(user.email)
			.then(function () {
				res.status(200).send("Email Sent");
			})
			.catch(function (error) {
				res.status(500).send(error);
			});
	} else {
		res.status(404).send("User does not exist, check userId ");
	}
});

/**
 * @swagger
 * paths:
 *  /api/user/forgotpassword/{userEmail}:
 *   put:
 *    tags:
 *    - "user"
 *    summary: Use for reseting the password with email
 *    parameters:
 *     - in: path
 *       name: userEmail
 *    responses:
 *     "200":
 *      description: user password reset email sent
 */
route.put("/forgotpassword/:userEmail", async (req, res) => {
	// Send email for password reset
	firebaseapp
		.auth()
		.sendPasswordResetEmail(req.params.userEmail)
		.then(function () {
			res.status(200).send("Email Sent");
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});
module.exports = route;
