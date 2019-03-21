import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Signup NOW!',
  };
  state = { email: '', password: '', errorMessage: null }

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          height: 100,
          padding: 20,
        }}>
        <View style={{ backgroundColor: 'blue', flex: 0.3 }} />
        <View style={{ backgroundColor: 'red', flex: 0.5 }} />

        {/* {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>} */}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          onPress={this._signUp}
          title="Sign Up Now!"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
  _signUp = () => {
    // Create user 

    // Sign 
    // await AsyncStorage.clear();
    this.props.navigation.navigate('Main');
  };
}

// Styling

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})