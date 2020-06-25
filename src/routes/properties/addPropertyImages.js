const route = require("express").Router();
const propertyModel = require("../../models/property.model");
const upload = require("../../middlewares/fileUpload");
const s3 = require("../../middlewares/AWS/s3Upload");

/**
 * @swagger
 * paths:
 *  /api/property/images/{propId}:
 *   get:
 *    tags:
 *    - "Property"
 *    summary: To check inside Property add images
 *    responses:
 *     "200":
 *      description: In Property add images
 */
route.get("/images/:propId", (req, res) => {
	res.status(200).send("In Add images 📷" + req.params);
});

/**
 * @swagger
 * paths:
 *  /api/property/images/{propId}:
 *   post:
 *    tags:
 *    - "Property"
 *    summary: Use for property adding images
 *    requestBody:
 *     required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Property'
 *    responses:
 *     "201":
 *      description: successfully added images to property
 */
route.post("/images/:propId", upload, async (req, res) => {
	try {
		// Check Property exists
		const property = await propertyModel.findOne({ _id: req.params.propId });
		if (property) {
			// Number of files sent
			console.info(req.files.length);
			// Starting the upload to s3
			Promise.all(
				req.files.map((file) => {
					let myFile = file.originalname.split(".");
					const fileType = myFile[myFile.length - 1];

					// Setting the params for the ss3 buckeet
					const params = {
						Bucket: process.env.AWS_BUCKET_PROPIMAGES,
						acl: "public-read",
						Key: `${property.propName}_${Date.now()}.${fileType}`,
						Body: file.buffer,
					};

					// Uploadin to s3
					return s3
						.upload(params, (err, data) => {
							if (error) {
								res.status(400).send(err);
							}
						})
						.promise();
				})
			)

				.then((datas) => {
					// Saving the links to mongoDb
					const images = datas.map((data) =>
						property.photos.push(data.Location)
					);
					console.log(images);
					const updatedProperty = property.save();
					// Returning the updated document
					res.status(200).send(updatedProperty);
				})
				.catch((err) => {
					// Error when images not uploaded to s3
					console.log(err);
					res.status(400).send(err);
				});
		}
	} catch (error) {
		// Error for property not found in database
		res
			.status(404)
			.send("property does not exist or image not uploaded \n" + error);
	}
});

module.exports = route;
