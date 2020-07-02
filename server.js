//  Load express module with `require` directive
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Importing from files
const swaggerOptions = require("./src/configs/swaggerOptions.config");

//Package Configurations
const app = express();
dotenv.config();

// Launch listening server on port 8080
app.listen(process.env.PORT, function () {
	console.log("App listening!");
});

// Swagger Documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB connectioon using mongoose
mongoose.connect(
	process.env.DB_HOST,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	() => console.log("Data active")
);

// Middleware
app.use(bodyParser.json());

// Routes
require("./src/routes")(app);

// This matches all routes and all methods
app.use((req, res, next) => {
	res.status(404).send({
		status: 404,
		error: "Not Found",
	});
});
