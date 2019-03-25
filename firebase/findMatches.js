const { db } = require('./firebase.js');

const userRef = db.ref('sampleUsers/users');

const getUsers = (userLocation, username, callback) => {
  userRef.once('value', (snapshot) => {
    let data = snapshot.val();
    let filteredData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].id !== username) {
        filteredData.push(data[i]);
      }
    }
    callback(filteredData);
  });
};

const filterByUserLocation = (list, userLocation) => {
  // in progress
};

const storeAndCheckMatch = (currentUser, targetUser, callback) => {
  db.ref(`matches/${currentUser}/${targetUser}`).set(true);
  checkMatch(currentUser, targetUser, (bool) => {
    callback(bool);
  });
};

const checkMatch = (currentUser, targetUser, callback) => {
  db.ref(`matches/${targetUser}`).once('value', (snapshot) => {
    let val = snapshot.val() || {};
    callback(val[currentUser]);
  });
};

module.exports = { getUsers, storeAndCheckMatch };

//getUsers();
//storeAndCheckMatch('aqilthanawala', 'jenharen');
