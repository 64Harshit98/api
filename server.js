//  Load express module with `require` directive
var express = require("express");
var app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Customer Api",
			description: "Cust api info",
			contact: {
				name: "AsliKhalnayak",
				version: 0.1,
			},
			servers: ["http://localhost:8080"],
		},
	},
	// ['.routes/*.js]
	apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define request response in root URL (/)
// app.get("/", function (req, res) {
// 	res.status(200).send("Server running");
// });

// Routes
/**
 * @swagger
 * paths:
 *  /customers/:
 *   get:
 *    summary: Use for customers
 *    responses:
 *     "200":
 *      description: success
 */
app.get("/customers", function (req, res) {
	res.status(200).send("customer result");
});

// Launch listening server on port 8080
app.listen(8080, function () {
	console.log("App listening on port 8080!");
});

module.exports = app;
