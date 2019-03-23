const firebase = require("firebase");
const config = require("./config.js");
const fb = firebase.initializeApp(config);

const auth = fb.auth();
const db = fb.database();
const storage = firebase.storage();

module.exports.db = db;
module.exports.auth = auth;
module.exports.storage = storage;
