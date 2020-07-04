const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Api",
			description: "Overall API to handle all the tech processes",
			contact: {
				name: "AsliKhalnayak",
				version: 0.1,
			},
			servers: [
				{
					url: "http://localhost:8080/",
					description: "Development server",
				},
			],
		},
	},
	apis: [
		"server.js",
		"./src/routes/*.js",
		"./src/models/*.model.js",
		"./src/models/schemas/*.schema.js",
		"./src/routes/*/*.js",
	],
};

module.exports = swaggerOptions;
