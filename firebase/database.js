const { db } = require('./firebase.js');

const storeValue = (userId, value) => {
  db.ref('user/' + userId).set({
    value: value
  });
};

const listen = (userId) => {
  db.ref('user/' + userId).on('value', (snapshot) => {
    let val = snapshot.val().value;
    console.log('new value:', val);
  });
};

