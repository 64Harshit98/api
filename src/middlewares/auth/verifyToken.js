const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	// Checkinh header sent or not
	const header = req.headers["auth"];
	if (header) {
		const token = header.split(" ")[1];
		jwt.verify(token, process.env.JWT_TOKEN_SECRET, function (err, data) {
			if (err) {
				req.status(403).send("Forbidden");
			} else {
				req._id = data._id;
				req.userType = data.type;
				next();
				return;
			}
		});
	} else {
		res.status(403).send("No Auth-header| Forbidden");
		return;
	}
};

module.exports.verifyToken = verifyToken;
