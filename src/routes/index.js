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
 *- name: "property"
 *   description: "Everything about the property "
 *- name: "booking"
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
