import React, {Component} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class MessagesDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatRoomId: null
        }
    }

    render () {
      let {id, name, currentUser} = this.props
      return (
        <View
        style ={[styles.card]}
        >
          <View
          style = {[styles.cardInside]}
          >
            <Avatar
            rounded
            source={{uri: 'https://s3-us-west-1.amazonaws.com/sephoraimage/explores/pic13.jpg'}}
            size='medium'
            />
            <Button 
            onPress={() => {this.props._navigateToChatRoom(id, name, currentUser)}} 
            title = {`   ${this.props.name}`}
            color='#841584'
            />
          </View>
        </View> 
      )
    }
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    padding: 7
  },

  cardInside: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  }
})