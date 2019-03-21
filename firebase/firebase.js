const firebase = require('firebase');
const config = require('./config.js');
const fb = firebase.initializeApp(config);

const auth = fb.auth();
const db = fb.database();

module.exports.db = db;
module.exports.auth = auth;
