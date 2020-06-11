const MainBookingRouter = require("express").Router();

MainBookingRouter.get("/", (req, res) => {
	res.status(200).send("In Booking Router! 📚");
});

module.exports = MainBookingRouter;
