import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button, ImageBackground } from "react-native";

import axios from 'axios';
// Insert background image file

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: "Please Login"
  };
  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  // Login user with firebase
  _login = () => {
    console.log("I know what Im doing");

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBCiP3A5KWG4HQ92Eu-FQFQafC2ape3z3Q';

    if (this.state.email !== null && this.state.email !== "" && this.state.password !== null && this.state.password !== "") {
      axios.post(url, {
        email: this.state.email,
        pass: this.state.password
      })
        .then((response) => {
          console.log('Response', response.data);
          this._navigateToMain();
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      // Alert user that they are missing a email or password
      alert('missing a email or password');
    }
  };

  // This method will push the 'signup' view onto the stack
  _navigateToSignUp = () => {
    this.props.navigation.navigate("Signup", {});
  };

  // This method will push the 'Main' view onto the stack
  _navigateToMain = () => {
    this.props.navigation.navigate("Main", {});
  };

  render() {
    return (
      <ImageBackground source={require('../../assets/images/Login_Screen.png')} style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            height: 100,
            padding: 20,
            backgroundColor: ""
          }}
        >
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
          <View
            style={{
              flexDirection: "row",
              height: 100,
              padding: 20,
              backgroundColor: "",
              justifyContent: "baseline"
            }}
          >
            <Text>Dont have an account yet?</Text>
            <Button
              onPress={this._navigateToSignUp}
              title="Sign up!"
              color="#841584"
              accessibilityLabel="Sign up for an account"
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center"
  }
});

