const route = require("express").Router();
const propertyModel = require("../../models/property.model");
const upload = require("../../middlewares/fileUpload");
const s3 = require("../../middlewares/AWS/s3Upload");

/**
 * @swagger
 * paths:
 *  /api/property/images/{propId}:
 *   post:
 *    tags:
 *    - "Property"
 *    summary: Use for property adding images
 *    parameters:
 *     - in: path
 *       name: propId
 *       required: true
 *       description: The property Id for selecting property
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
					const propName = property.propName.replace(/ /g, "");
					// Setting the params for the ss3 buckeet
					const params = {
						Bucket: process.env.AWS_BUCKET_PROPIMAGES,
						acl: "public-read-write",
						Key: `${propName}/${propName}_${Date.now()}.${fileType}`,
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
					datas.map((data) => property.photos.push(data.Location));

					property.save();
					// Returning the updated document
					res.status(200).send(property);
				})
				.catch((err) => {
					// Error when images not uploaded to s3
					console.log(err);
					res.status(400).send(err);
				});
		}
	} catch (error) {
		// Error for property not found in database
		res.status(404).send("property does not exist or image not uploaded \n" + error);
	}
});

/**
 * @swagger
 * paths:
 *  /api/property/images/{propId}:
 *   delete:
 *    tags:
 *    - "Property"
 *    summary: Use for deleting property images
 *    parameters:
 *     - in: path
 *       name: propId
 *       required: true
 *       description: The property Id for selecting property
 *    requestBody:
 *     required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Property'
 *    responses:
 *     "201":
 *      description: successfully deleted images of property
 */
route.delete("/images/:propId", (req, res) => {
	// Defining the object array
	const images = req.body.deleteImages;
	var objects = [];
	images.map((image) => {
		var temp = image.split("/");
		const key = `${temp[temp.length - 2]}/${temp[temp.length - 1]}`;
		objects.push({ Key: key });
	});

	const params = {
		Bucket: process.env.AWS_BUCKET_PROPIMAGES,
		Delete: {
			Objects: objects,
		},
	};

	s3.deleteObjects(params, function (err, data) {
		if (err) {
			res.status(400).send(err);
		} else {
			console.log(data);
			// Finding the property and deleting from mongoDB
			propertyModel.findById(req.params.propId, function (err, property) {
				if (err) {
					res.status(400).send(err);
				} else {
					images.map((image) => property.photos.pull(image));
					property.save();
					res.status(200).send(property);
				}
			});
		}
	});
});
module.exports = route;
