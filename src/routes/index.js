/**
 * routes/index.js
 * All the sub routes to the api
 */

/**
 * @swagger
 * tags:
 *- name: "User"
 *   description: "Everything about your user"
 *   externalDocs:
 *    description: Firebase
 *    url: https://firebase.google.com/docs/
 *- name: "Property"
 *   description: "Everything about the property "
 *   externalDocs:
 *    description: AWS
 *    url: https://docs.aws.amazon.com/
 *- name: "Booking"
 *   description: "Everything about the booking."
 *   externalDocs:
 *    description: "Paymnet Gateway"
 *    url: "http://swagger.io"
 *- name: "Visit"
 *   description: "Everything about the visit Scheduling."
 *   externalDocs:
 *    description: "Paymnet Gateway"
 *    url: "http://swagger.io"
 */

module.exports = function (app) {
	app.use("/api/user", require("./users"));
	app.use("/api/property", require("./properties"));
	app.use("/api/booking", require("./bookings"));
	app.use("/api/visit", require("./visits"));
};
