const MainPropertyRouter = require("express").Router();

MainPropertyRouter.get("/", (req, res) => {
	res.status(200).send("In Property Router!🏠");
});

module.exports = MainPropertyRouter;
