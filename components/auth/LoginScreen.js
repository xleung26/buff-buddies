import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Please Login'
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
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          onPress={this._login}
          title="Login!"
          color="#841584"
          accessibilityLabel="Login to your account"
        />
        <Button
          onPress={this._navigateToSignUp}
          title="Sign up!"
          color="#841584"
          accessibilityLabel="Login to your account"
        />
      </View>
    );
  }
  _login = () => {
    console.log('I know what Im doing');

    // On successful login
    // Navigate to main function call passing user or setting user in config
    // On login failure
    // Trigger alert and ask to create account or try again
  }
  _navigateToSignUp = () => {
    this.props.navigation.navigate('Signup', {});
  }
  _navigateToMain = () => {
    this.props.navigation.navigate('Main', {});
  }
}

// Styles
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