import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import MessagesDisplay from './messagesDisplay.js';
import db from '../../firebase/chatDB.js'
import ChatRoom from './chatRoom.js';
import {Card} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

export default class Rooms extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentUser: 'aqilthanawala',
            chatId: [],
            users: [],
            // chatRoomId: null
        }

        this.changeChatRoom = this.changeChatRoom.bind(this);
        this._navigateToChatRoom = this._navigateToChatRoom.bind(this);
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

    _navigateToChatRoom = (id, name, currentUser) => {
        this.props.navigation.navigate("ChatRoom", {
            partner: name,
            chatId: id,
            currentUser: currentUser,
        })
    }

    render () {
        return (

            // this.state.chatRoomId === null ?
            <Card
            title = 'BUDDIES'
            >
            <ScrollView>
                {this.state.users.length !== 0? this.state.users.map((item, index) =>  
                    <MessagesDisplay 
                    name = {item}
                    key = {index}
                    _navigateToChatRoom = {this._navigateToChatRoom}
                    id = {this.state.chatId[index]}
                    currentUser= {this.state.currentUser}
                    />
                ): <Text></Text>}
            </ScrollView>
            </Card>
            // :
            // <ChatRoom
            // partner = {this.state.users[this.state.chatId.indexOf(this.state.chatRoomId)]}
            // messages = {this.state.messages}
            // chatRoom = {this.state.chatRoomId}
            // changeChatRoom = {this.changeChatRoom}
            // currentUser = {this.state.currentUser}
            // />            
        )
    }
}


// export is the object

// export defaultl is the equation