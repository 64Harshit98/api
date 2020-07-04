const route = require("express").Router();
const userModel = require("../../models/user.model");
const {
	userProfileValidation,
} = require("../../middlewares/validators/userValidation");

const firebaseapp = require("../../middlewares/firebaseapp");
/**
 * @swagger
 * paths:
 *  /api/user/profiles:
 *   get:
 *    tags:
 *    - "user"
 *    summary: Use for users data
 *    responses:
 *     "200":
 *      description: all data from MongoDb
 */
route.get("/profiles", async (req, res) => {
	// Extracting all users in database
	await userModel.find({}, function (error, usersData) {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(usersData);
		}
	});
});

/**
 * @swagger
 * paths:
 *  /api/user/profile/{userId}:
 *   get:
 *    tags:
 *    - "user"
 *    summary: Use for finding user with the given user id
 *    parameters:
 *     - in: path
 *       name: userId
 *    responses:
 *     "200":
 *      description: user found
 */
route.get("/profile/:userId", async (req, res) => {
	// Checking userId exists
	if (req.params.userId) {
		// Extracting user with the given userId
		await userModel.find({ _id: req.params.userId }, function (
			error,
			userData
		) {
			if (error) {
				res.status(404).send("User not found");
			} else {
				res.status(200).send(userData);
			}
		});
	}
});

/**
 * @swagger
 * paths:
 *  /api/user/profile/{userId}:
 *   put:
 *    tags:
 *    - "user"
 *    summary: Use for user profile update
 *    parameters:
 *     - in: path
 *       name: userId
 *    responses:
 *     "200":
 *      description: user updated
 */
route.put("/profile/:userId", async (req, res) => {
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
 *    - "user"
<<<<<<< HEAD
 *    summary: Use for deleting th user, not to be used
=======
 *    summary: Use for deleting th user
>>>>>>> master
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
		user.remove();
		res.status(404).send(user);
	} else {
		res.status(404).send("User does not exist ");
	}
});

module.exports = route;
