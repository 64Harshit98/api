const route = require("express").Router();
const userModel = require("../../models/user.model");
const { userProfileValidation } = require("../../middlewares/validators/userValidation");

const { verifyToken } = require("../../middlewares/auth/verifyToken");
/**
 * @swagger
 * paths:
 *  /api/user/profiles:
 *   get:
 *    tags:
 *    - "User"
 *    summary: Use for users data by admin
 *    parameters:
 *     - in: header
 *       name: auth
 *    responses:
 *     "200":
 *      description: all data from MongoDb
 */
route.get("/profiles", verifyToken, async (req, res) => {
	if (req.userType == "admin") {
		// Extracting all users in database
		await userModel.find({}, function (error, usersData) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(usersData);
			}
		});
	}
	res.status(403).send("Forbidden");
});

/**
 * @swagger
 * paths:
 *  /api/user/profile/{userId}:
 *   get:
 *    tags:
 *    - "User"
 *    summary: Use for finding user with the given user id
 *    parameters:
 *     - in: path
 *       name: userId
 *     - in: header
 *       name: auth
 *    responses:
 *     "200":
 *      description: user found
 */
route.get("/profile/:userId", verifyToken, async (req, res) => {
	// Checking userId exists
	if (req.params.userId == req._id) {
		// Extracting user with the given userId
		await userModel.find({ _id: req.params.userId }, function (error, userData) {
			if (error) {
				res.status(404).send("User not found");
			} else {
				res.status(200).send(userData);
			}
		});
	} else {
		res.status(403).send("Forbidden");
	}
});

/**
 * @swagger
 * paths:
 *  /api/user/profile/{userId}:
 *   put:
 *    tags:
 *    - "User"
 *    summary: Use for user profile update
 *    parameters:
 *     - in: path
 *       name: userId
 *     - in: header
 *       name: auth
 *    responses:
 *     "200":
 *      description: user updated
 */
route.put("/profile/:userId", verifyToken, async (req, res) => {
	// Checking the user is authorized or not
	if (req._id != req.params.userId) return res.status(403).send("Forbidden");
	// Find and update the user with the given user id
	const { error } = userProfileValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Checking if userId sent or not
	if (!req.body.email && !req.body.password) {
		const user = await userModel.findOne({ _id: req.params.userId });
		if (user) {
			try {
				const userUpdated = await userModel.findByIdAndUpdate(
					req.params.userId,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).send(userUpdated);
			} catch (error) {
				res.status(404).send(error);
			}
		} else {
			res.status(404).send("User does not exist ");
		}
	} else {
		res.status(400).send("Email and password cant be updated directly");
	}
});

/**
 * @swagger
 * paths:
 *  /api/user/profile/{userId}:
 *   delete:
 *    tags:
 *    - "User"
 *    summary: Use for deleting th user, not to be used
 *    parameters:
 *     - in: path
 *       name: userId
 *    responses:
 *     "200":
 *      description: user deleted
 */
route.delete("/profile/:userId", async (req, res) => {
	const user = await userModel.findOne({ _id: req.params.userId });
	if (user) {
		// user.remove();
		res.status(404).send(user);
	} else {
		res.status(404).send("User does not exist ");
	}
});

module.exports = route;
