import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import db from '../../firebase/chatDB.js';

export default class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            text: ''
        }
        this.fetchMessages = this.fetchMessages.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
      this.fetchMessages()
    }

    fetchMessages () {
        db.fetchMessages(this.props.chatRoom, (data) => {
            this.setState({ messages: data })
          })
    }

    handleSubmit () {
        let messId = this.state.messages.length;
        if (this.state.text !== ''){
            db.messagesStore(this.props.id, messId, this.props.currentUser, this.state.text)
        }
        this.textInput.clear()
    }

    render () {

        return (
            <View>
                <Button
                onPress = {() => this.props.changeChatRoom(null)} 
                title = {`back`}
                >
                </Button>
                {this.state.messages.length !== 0 ?
                this.state.messages.map((item, index) => {return <Text key={index} >{`${item.userName}: ${item.message}`}</Text>}): <View></View>
                }
                <TextInput 
                placeholder = 'Type here'
                onChangeText = {(text) => this.setState({text})}
                ref={input => { this.textInput = input}}
                />
                <Button 
                onPress = {this.handleSubmit}
                title = {`submit`}
                />
            </View> 
        )
    }
}