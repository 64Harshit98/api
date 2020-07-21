const jwt = require("jsonwebtoken");

const createToken = ({ _id, userType, name }) => {
	const token = jwt.sign({ _id: _id, type: userType, name: name }, process.env.JWT_TOKEN_SECRET, {
		algorithm: "HS256",
	});
	return token;
};

module.exports.createToken = createToken;
