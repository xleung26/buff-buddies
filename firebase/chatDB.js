const { db } = require('./firebase.js');
const Promise = require('bluebird')

// might not need this helper function

const fetchChatRooms = (userName, callback) => {
  let arr = [];
  db.ref(`user/${userName}/chat`).on('value', (snapshot) => {
    let temp = snapshot.val()
    console.log(temp)
    for (let key in temp){
      arr.push(temp[key]);
    }
    callback(arr);
  })
}

const chatStore = (value) => {
    
  
  db.ref(`chat/${chatId}`).set({
    title: value
  })
}


const storeUserChat = (userName, chatId) => {
  db.ref(`user/${userName}/chat`).push(chatId)
}

const memberStore = (chatId, mem1, mem2) => {
  db.ref(`member/${chatId}/${mem1}`).set(true);
  db.ref(`member/${chatId}/${mem2}`).set(true);
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

  // db.ref(`messages/${chatId}/m${messageId}`).on('value', (snapshot) => {
  //   let val = snapshot.val().message;
  //   callback(val);
  // })
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

module.exports = { chatStore, storeUserChat, memberStore, messagesStore, fetchChatRooms, fetchMembers, fetchMessages}