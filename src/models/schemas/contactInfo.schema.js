const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	pContact: {
		type: Number,
		minlength: 10,
		maxlength: 15,
	},
	sContact: {
		type: Number,
		minlength: 10,
		maxlength: 15,
	},
	email: {
		type: String,
		min: 5,
	},
	// Address
});
