import React, {Component} from 'react';
import {
    View, 
    Text, 
    Button, 
    TextInput, 
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
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
            db.messagesStore(this.props.chatRoom, messId, this.props.currentUser, this.state.text)
        }
        this.textInput.clear()
    }

    render () {

        return (
            <View
            style ={[styles.bigContainer]}
            scrollEnabled={false}  
            >
                <View
                style = {[styles.topContainter]}
                >
                <Button
                onPress = {() => this.props.changeChatRoom(null)} 
                title = {`back`}
                style = {[styles.backButton]}
                >
                </Button>
                <Text
                style = {[styles.partner]}
                >{this.props.partner}</Text>
                </View>
                <View
                style ={[styles.messageContainer]}
                scrollEnabled={false}                  
                >
                <ScrollView 
                style ={[styles.scroll]}
                >
                {this.state.messages.length !== 0 ?
                this.state.messages.map((item, index) => {return <View
                  style = {[styles.message]}
                  key={index}                   
                  >
                  <Text
                  style = {[styles.userName]}
                  >{item.userName}</Text><Text>{`: `}</Text><Text>{item.message}</Text>
                  </View>
                })
                : <View></View>
                }
                </ScrollView>
                </View>
                <View
                style = {[styles.submissionContainer]} 
                >
                    <TextInput 
                    placeholder = 'Type here'
                    onChangeText = {(text) => this.setState({text})}
                    ref={input => { this.textInput = input}}
                    style = {[styles.textInput]}                    
                    />
                    <Button 
                    onPress = {this.handleSubmit}
                    title = {`submit`}
                    style = {[styles.submit]}
                    />
                </View>
            </View> 
        )
    }
}

const screen_height = Dimensions.get('window').height;
const screen_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    bigContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflow: 'hidden',
    },

    topContainter: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },

    backButton: {
        alignSelf: 'flex-start',
        fontSize: 10,
    },

    partner: {
        fontSize: 20,    
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 100
    },

    message: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        margin: 5
    },

    messageContainer: {
        height: '85%',
        marginLeft: 5,
        marginRight: 5
    },

    scroll: {
        overflow: 'hidden',
    },

    userName: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    text: {
        fontSize: 15
    },

    submissionContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        marginLeft: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 5
    },

    textInput: {
        alignSelf: 'flex-start',
        fontSize: 13,
        width: '75%',
        borderWidth: 1,
        height: 30
    },

    submit: {
        alignSelf: 'center',
        fontSize: 10,
    }
})