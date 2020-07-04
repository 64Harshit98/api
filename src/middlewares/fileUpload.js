const multer = require("multer");

// Temporary memory storage before upload
const storage = multer.memoryStorage({
	destinantion: function (req, file, callback) {
		callback(null, "");
	},
});

const upload = multer({ storage }).array("file");
module.exports = upload;
