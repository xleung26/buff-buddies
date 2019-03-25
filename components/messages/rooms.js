import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import MessagesDisplay from './messagesDisplay.js';
import db from '../../firebase/chatDB.js'
import ChatRoom from './chatRoom.js';
import {Card} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
// import { createStackNavigator, createAppContainer } from 'react-navigation';

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

    _navigateToChatRoom = () => {
        this.props.navigation.navigate("ChatRoom", {
            partner: this.state.users[this.state.chatId.indexOf(this.state.chatRoomId)],
            chatRoom: this.state.chatRoomId,
            currentUser: this.state.currentUser,
        }
        )
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
                    // id = {this.state.chatId[index]}
                    // changeChatRoom = {this.changeChatRoom}
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

// const MessagingApp = createStackNavigator(
//     {
//         Rooms: Rooms,
//         ChatRoom: ChatRoom,
//     },
//     {
//         initialRouteName: Rooms
//     }
// )

// const AppContainer = createAppContainer(MessagingApp);

// export default class MessageApp extends Component {
//     render () {
//         return <AppContainer />
//     }
// }


// export is the object

// export defaultl is the equation