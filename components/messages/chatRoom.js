import React, {Component} from 'react';
import {
    View, 
    Text, 
    Button, 
    TextInput, 
    StyleSheet,
    Dimensions,
    ScrollView,
    Keyboard
} from 'react-native';
import DisplayProfile from './buddyProfile.js'
import db from '../../firebase/chatDB.js';
import {Avatar} from 'react-native-elements';

const screen_height = Dimensions.get('window').height;
const screen_width = Dimensions.get('window').width;

export default class ChatRoom extends Component {
    // static navigationOptions = {
    //     title: this.props.partner
    // }

    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state;

        return {
            title: (
                <Button
                title = {params.partner}
                onPress = {}
                />
            )
        }
    }

    constructor(props){
        super(props);
        this.state = {
            messages: [],
            text: '',
            keyboard: false,
            chatId: null,
        }
        this.fetchMessages = this.fetchMessages.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._keyboardWillShow = this._keyboardWillShow.bind(this);
        this._keyboardWillHide = this._keyboardWillHide.bind(this);
        this.handleBuddyProfile = this.handleBuddyProfile.bind(this);
    }

    componentDidMount () {
      const { navigation } = this.props;
      const chatId = navigation.getParam('chatId', 'No-Room')
      this.setState({
        chatId: chatId
      }, () => {this.fetchMessages()})
      this.keyboardWillShowListener = Keyboard.addListener(
        'keyboardWillShow',
        this._keyboardWillShow,
      );
      this.keyboardWillHideListener = Keyboard.addListener(
          'keyboardWillHide', this._keyboardWillHide,
      );
    }

    _keyboardWillShow () {
        this.setState({ keyboard: true })
    }

    _keyboardWillHide () {
        this.setState({ keyboard: false })
    }

    fetchMessages () {
        db.fetchMessages(this.state.chatId, (data) => {
            this.setState({ messages: data })
          })
    }

    handleBuddyProfile (value) {
        this.setState({ buddy: value })
    }

    handleSubmit () {
        const { navigation } = this.props;
        const currentUser = navigation.getParam('currentUser', 'N/A')
        let messId = this.state.messages.length;
        if (this.state.text !== ''){
            db.messagesStore(this.state.chatId, messId, currentUser, this.state.text)
        }
        this.textInput.clear()
    }

    render () {
        let adjKeyboard = {bottom: 0}

        let adjMessageBox = {height: screen_height * .66}       

        if (this.state.keyboard) {
            adjKeyboard.bottom = 15
            adjMessageBox.height = screen_height * .35
        }
        const { navigation } = this.props;
        const partner = navigation.getParam('partner', 'N/A')
        const currentUser = navigation.getParam('currentUser', 'N/A')

        return (

            // this.state.buddy === null?
            <View
            style ={[styles.bigContainer]}
            scrollEnabled={false}  
            >
                <View
                style = {[styles.topContainter]}
                >
                {/* <Button
                onPress = {() => this.props.changeChatRoom(null)} 
                title = {`back`}
                style = {[styles.backButton]}
                >
                </Button> */}
                {/* <Text
                style = {[styles.partner]}
                // onPress = {() => this.handleBuddyProfile(this.props.partner)}
                >{partner}</Text> */}
                </View>
                <View
                style ={[styles.messageContainer, adjMessageBox]}           
                >
                <ScrollView 
                style ={[styles.scroll, adjMessageBox]}
                ref = 'scrollView'
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode='on-drag'
                onLayout={() => this.refs.scrollView.scrollToEnd({ animated: false })}
                onContentSizeChange = {() => this.refs.scrollView.scrollToEnd({ animated: false })}
                >
                {this.state.messages.length !== 0 ?
                this.state.messages.map((item, index) => {
                  return (item.userName !== currentUser)? <View
                  style = {{display: 'flex', flexDirection: 'row', width: 375, justifyContent: 'flex-start'}}
                  key={index}    
                  >
                  <View
                  style = {[styles.buddyMessage]}               
                  >
                  <Avatar
                  rounded
                  source={{uri: 'https://s3-us-west-1.amazonaws.com/sephoraimage/explores/pic13.jpg'}}
                  size='small'
                  /><Text>{`    `}</Text>
                  <Text
                  style = {styles.budTextMessage}
                  >{item.message}</Text>
                  </View>
                  </View>
                  : <View
                  style = {{display: 'flex', flexDirection: 'row', width: 375,justifyContent: 'flex-end'}}
                  key={index}          
                  >
                  <View
                  style = {[styles.userMessage]}         
                  >
                  <Text
                  style = {styles.userTextMessage}
                  >{item.message}</Text>
                  <Text>{`    `}</Text>
                  <Avatar
                  rounded
                  source={{uri: 'https://s3-us-west-1.amazonaws.com/sephoraimage/explores/pic20.jpg'}}
                  size='small' 
                  />
                  </View>
                  </View>
                })
                : <View></View>
                }
                </ScrollView>
                </View>
                <Text
                >{`\n\n\n`}</Text>
                <View
                style = {[styles.submissionContainer, adjKeyboard]} 
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode='on-drag'
                >
                    <TextInput 
                    placeholder = '  Type here'
                    onChangeText = {(text) => this.setState({text})}
                    ref={input => { this.textInput = input}}
                    style = {[styles.textInput]}
                    />
                    <Button 
                    onPress = {this.handleSubmit}
                    title = {`Send`}
                    style = {[styles.submit]}
                    />
                </View>
            </View> 
            // :
            
            // <DisplayProfile 
            // buddy= {this.state.buddy}
            // handleBuddyProfile = {this.handleBuddyProfile}
            // />
        )
    }
}


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
        width: screen_width,
        borderColor: "#E8E8E8",
        borderBottomWidth: 1,
    },

    backButton: {
        alignSelf: 'flex-start',
        fontSize: 10,
    },

    partner: {
        fontSize: 20,    
        fontWeight: 'bold',
        alignSelf: 'auto',
        marginLeft: 90
    },

    buddyMessage: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        margin: 5,
    },

    userMessage: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        margin: 5,
    },

    budTextMessage: {
        maxWidth: screen_width * 0.6, 
        alignSelf: 'center',
        padding: 7,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        overflow: 'hidden',
        fontSize: 15,    

    },

    userTextMessage: {
        maxWidth: screen_width * 0.6, 
        alignSelf: 'center',
        padding: 7,
        borderRadius: 10,
        backgroundColor: '#ff6666',
        overflow: 'hidden',
        fontSize: 15,    

    },

    messageContainer: {
        height: screen_height * .66,
        width: screen_width,
        marginLeft: 5,
        marginRight: 5,
        overflow: 'hidden',
        left: 0,
        right: 0,
        bottom: 0,

    },

    scroll: {
        overflow: 'hidden',
        height: screen_height * .66,
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
        width: '80%',
        height: 30,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 6
    },

    submit: {
        alignSelf: 'center',
        fontSize: 10,
    }
})
