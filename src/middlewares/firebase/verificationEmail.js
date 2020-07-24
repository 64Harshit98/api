const firebaseapp = require("../../middlewares/firebase/firebaseapp");

function sendEmailVerification() {
	// [START sendemailverification]
	firebaseapp
		.auth()
		.currentUser.sendEmailVerification()
		.then(function () {
			// Email Verification sent!
			// [START_EXCLUDE]
			console.info("Email Verification Sent!");
			// [END_EXCLUDE]
		});
	// [END sendemailverification]
}

module.exports.sendEmailVerification = sendEmailVerification;
