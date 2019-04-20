import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Rooms from '../components/messages/rooms';


export default class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Rooms />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
