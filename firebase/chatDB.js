const { db } = require('./firebase.js');
const Promise = require('bluebird')

const fetchChatRooms = (userName, callback) => {
  let arr = [];
  db.ref(`user/${userName}/chat`).on('value', (snapshot) => {
    let temp = snapshot.val()
    for (let key in temp){
      arr.push(temp[key]);
    }
    callback(arr);
  })
}

// just invoke this one function ------------------------------->
const chatStore = (userName1, userName2) => {
  db.ref(`chat/`).once('value', async (snapshot) => {
    let val = snapshot.val();
    if (val === null){
      await db.ref(`chat/`).set({count: 0})
      memberStore(userName1, userName2);
      storeUserChat(userName1);
      storeUserChat(userName2);
    } else {
      await db.ref(`chat/`).set({count: val.count + 1})
      memberStore(userName1, userName2);
      storeUserChat(userName1);
      storeUserChat(userName2);
    }
  }) 
}

// ------------------------------------------------------------->

const chatIdGen = (callback) => {
  db.ref(`chat/`).on('value', (snapshot) => {
    let val = snapshot.val().count;
    callback(val);
  })
}

const storeUserChat = (userName) => {
  chatIdGen((id) => {
    db.ref(`user/${userName}/chat`).push(id)
  })
}

const memberStore = (userName1, userName2) => {
  chatIdGen((id) => {
    db.ref(`member/${id}/${userName1}`).set(true);
    db.ref(`member/${id}/${userName2}`).set(true);
  })
}

const fetchMembers = (arr, userName, callback) => {
    let results = [];
    let count = 0;
    for(let i = 0; i < arr.length; i += 1){
        db.ref(`member/${arr[i]}`).on('value', (snapshot) => {
            let val = snapshot.val();
            for (let key in val){
              if (key !== userName){
                results.push(key);
                count += 1;
                if (count === arr.length) {
                    callback(results);
                }
              }
            }
        })
    }
}

const messagesStore = (chatId, messageId, userName, message) => {
  let time = new Date()
  db.ref(`messages/${chatId}/${messageId}m`).set({
      userName: userName,
      message: message,
      timeStamp: time.toUTCString().slice(4).trim()
  })
}

const fetchMessages = (chatId, callback) => {
  db.ref(`messages/${chatId}`).on('value', (snapshot) => {
    let results = []
    let val = snapshot.val();
    for (let key in val){
      results[parseInt(key)] = val[key];
    }
    callback(results);
  }) 
}

// chatStore(1, 'Mal & Justin');
// memberStore(5, 'jane','aqilthanawala');
// storeUserChat('aqilthanawala', 3)
// messagesStore(5, 3, `aqilthanawala`, `why??`);
// fetchChatRooms(`aqilthanawala`, (data) => {
//     console.log(data)
// })
// fetchMembers([ 1 ], 'Justin', (data) => {
//     console.log(data)
// })
// chatStore(`usainbolt`, `Coco123`)


module.exports = { chatStore, messagesStore, fetchChatRooms, fetchMembers, fetchMessages}