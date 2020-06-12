const firebase = require("firebase");
const firebaseConfig = require("../configs/firebase.config");
// Firebase modules
require("firebase/auth");

// Making firebase variable to use
const firebaseapp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseapp;
