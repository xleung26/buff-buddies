const firebase = require("firebase");
const { config } = require("./config.js");
const fb = firebase.initializeApp(config);

const db = fb.database();

module.exports.db = db;
