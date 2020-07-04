/**
 * routes/index.js
 * All the sub routes to the api
 */

/**
 * @swagger
 * tags:
 *- name: "user"
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
 *    description: "Find out more"
 *    url: "http://swagger.io"
 */

module.exports = function (app) {
	app.use("/api/user", require("./users"));
	app.use("/api/property", require("./properties"));
	app.use("/api/booking", require("./bookings"));
};
