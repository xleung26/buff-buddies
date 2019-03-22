import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
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
            <View

            >
                <Button
                onPress = {() => this.props.changeChatRoom(null)} 
                title = {`back`}
                >
                </Button>
                {this.state.messages.length !== 0 ?
                this.state.messages.map((item, index) => {return <View 
                key={index} 
                style = {[styles.message]} 
                >
                  <Text>{item.userName}</Text><Text>{`: `}</Text><Text>{item.message}</Text>
                </View>}): <View></View>
                }
                <View
                style = {[styles.submissionContainer]} 
                >
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
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    bigContainer: {
        display: 'flex',
        flexDirection: 'column',        
    },

    message: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },

    submissionContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
})