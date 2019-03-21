import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import db from '../../firebase/chatDB.js';

export default class MessagesDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatRoomId: null
        }
    }

    render () {
      let chatRoom = this.props.id
      return (
        <View>
            <Button 
            onPress={() => {this.props.changeChatRoom(chatRoom)}} 
            title = {this.props.name}
            color='#841584'
            />
        </View> 
      )
    }
}