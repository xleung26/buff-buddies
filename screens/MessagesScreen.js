import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Rooms from '../components/messages/rooms';


export default class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
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
