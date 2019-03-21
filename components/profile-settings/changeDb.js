const { db } = require("../../firebase/firebase.js");
// const path = require("path");
// const fs = require("fs");

// fs.readFile(
//   path.resolve(__dirname, "./buff-buddies-export.json"),
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     data = JSON.parse(data.toString());
//     // console.log(data, data.userName);
//     addToDatabase(data, "jkelly");
//   }
// );

const addToDatabase = (usersObj, userName) => {
  return db
    .ref(`user/${userName}`)
    .set(usersObj)
    .then(() => console.log("post malone"));
};

const updateDatabase = (userName, key, message) => {
  return db
    .ref(`user/${userName}`)
    .update({
      [key]: message
    })
    .then(() => console.log("updated successfully"));
};

const deleteFromDatabase = userName => {
  return db
    .ref(`user/${userName}`)
    .set(null)
    .then(() => console.log("deleted successfully"));
};

const getFromDatabase = userName => {
  return db.ref(`user/${userName}`).once("value");
};

// getFromDatabase("justinchoi");

module.exports = {
  addToDatabase,
  updateDatabase,
  deleteFromDatabase,
  getFromDatabase
};
