const MainUserRouter = require("express").Router();

/**
 * @swagger
 * paths:
 *  /api/user:
 *   get:
 *    tags:
 *    - "user"
 *    summary: Use for users
 *    responses:
 *     "200":
 *      description: success
 */
MainUserRouter.get("/", (req, res) => {
	res.status(200).send("In User Router 👤");
});

// For registering the user
MainUserRouter.route("/register")
	.get(require("./userRegister"))
	.post(require("./userRegister"));

// For logging in the user
MainUserRouter.route("/login")
	.get(require("./userLogin"))
	.post(require("./userLogin"));

// Get all the usewrd data in the database
MainUserRouter.route("/profiles").get(require("./userProfile"));

// User specific data operations
MainUserRouter.route("/profile/:userId")
	.get(require("./userProfile"))
	.put(require("./userProfile"))
	.delete(require("./userProfile"));

// Password reset for the user
MainUserRouter.route("/passwordreset/:userId").put(require("./passwordReset"));
MainUserRouter.route("/forgotpassword/:userEmail").put(
	require("./passwordReset")
);

module.exports = MainUserRouter;
