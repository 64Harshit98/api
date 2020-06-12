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

MainUserRouter.route("/register")
	.get(require("./userRegister"))
	.post(require("./userRegister"));

MainUserRouter.route("/login")
	.get(require("./userLogin"))
	.post(require("./userLogin"));

module.exports = MainUserRouter;
