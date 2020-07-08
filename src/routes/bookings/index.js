const MainBookingRouter = require("express").Router();

MainBookingRouter.get("/", (req, res) => {
	res.status(200).send("In Booking Router! 📚");
});

// For booking a property
MainBookingRouter.route("/create").post(require("./createBooking"));

// For confirming the booking by property owner
MainBookingRouter.route("/confirm/:bookingId").put(require("./confirmBooking"));

// User will pay to confirm
MainBookingRouter.route("/pay/:bookingId").put(require("./confirmBooking"));

// To view booking per property
MainBookingRouter.route("/prop/:propId").get(require("./viewBooking"));

// To view booking per user
MainBookingRouter.route("/user/:userId").get(require("./viewBooking"));

// To cancel booking by user
MainBookingRouter.route("/cancel/:bookingId").put(require("./updateBooking"));

// To cancel booking by property
MainBookingRouter.route("/notavailable/:bookingId").put(
	require("./updateBooking")
);
module.exports = MainBookingRouter;
