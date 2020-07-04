const MainPropertyRouter = require("express").Router();

/**
 * @swagger
 * paths:
 *  /api/property:
 *   get:
 *    tags:
 *    - "Property"
 *    summary: Use for property
 *    responses:
 *     "200":
 *      description: success
 */
MainPropertyRouter.get("/", (req, res) => {
	res.status(200).send("In Property Router!🏠");
});

// For getting all properties
MainPropertyRouter.route("/all").get(require("./property"));

// To add property
MainPropertyRouter.route("/add")
	.get(require("./addProperty"))
	.post(require("./addProperty"));

// To find, update and delete property
MainPropertyRouter.route("/:userId")
	.get(require("./property"))
	.put(require("./updateProperty"))
	.delete(require("./updateProperty"));

// To CRD images of a property
MainPropertyRouter.route("/images/:propId")
	.get(require("./addPropertyImages"))
	.post(require("./addPropertyImages"))
	.delete(require("./addPropertyImages"));
module.exports = MainPropertyRouter;
