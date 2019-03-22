import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import MessagesDisplay from './messagesDisplay.js';
import db from '../../firebase/chatDB.js'
import ChatRoom from './chatRoom.js';

export default class Rooms extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentUser: 'aqilthanawala',
            chatId: [],
            users: [],
            chatRoomId: null
        }

        this.handleClick = this.handleClick.bind(this);
        this.changeChatRoom = this.changeChatRoom.bind(this);
    }

    componentDidMount () {
        let {currentUser} = this.state;
        db.fetchChatRooms(currentUser, (data) => {
          this.setState({ chatId: data }, () => {
              db.fetchMembers(data, currentUser, (results) => {
              this.setState({ users: results })
            })
          });
        });
    }
 
    changeChatRoom (value) {
        this.setState({chatRoomId: value})
    }

    handleClick () {
        console.log('hi')
    }

    render () {
        return (

            this.state.chatRoomId === null ?
            <View>
                {this.state.users.length !== 0? this.state.users.map((item, index) =>  
                    <MessagesDisplay 
                    name = {item}
                    key = {index}
                    id = {this.state.chatId[index]}
                    changeChatRoom = {this.changeChatRoom}
                    />
                ): <Text></Text>}
            </View>:
            <ChatRoom
            partner = {this.state.users[this.state.chatId.indexOf(this.state.chatRoomId)]}
            messages = {this.state.messages}
            chatRoom = {this.state.chatRoomId}
            changeChatRoom = {this.changeChatRoom}
            currentUser = {this.state.currentUser}
            />            
        )
    }
}


// export is the object

// export defaultl is the equation