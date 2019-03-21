const { db } = require('./firebase.js');

const userRef = db.ref('user');

const getUsers = (location) => {
  userRef.once('value', (snapshot) => {
    let data = snapshot.val();
    let matches = {};
    console.log(typeof data);
    for (let i in data) {
      if (i === 'justinchoi') {
        matches[i] = data[i];
      }
    }
  });
};

getUsers();
