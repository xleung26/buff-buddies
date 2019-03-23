import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button, ImageBackground } from "react-native";

import axios from 'axios';

export default class SignupScreen extends Component {
  static navigationOptions = {
    title: "Signup NOW!"
  };
  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  // This method will push the 'Main' view onto the stack
  _navigateToEdit = () => {
    this.props.navigation.navigate("EditPage", {});
  };
  // Sign Up user with firebase function
  _signUp = () => {
    // Create user
    if (this.state.email !== null && this.state.email !== "" && this.state.password !== null && this.state.password !== "") {
      axios.post('https://us-central1-buff-buddies.cloudfunctions.net/auth/signup', {
        email: this.state.email,
        pass: this.state.password
      })
        .then((response) => {
          console.log(response.data);
          this._navigateToEdit();
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      // Alert user that they are missing a email or password
      alert('You are missing either a valid email or password.')
    }
  };

  render() {
    return (
      <ImageBackground source={require('../../assets/images/Login_Screen.png')} style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            height: 100,
            padding: 20
          }}
        >

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
      </ImageBackground>
    );
  }
}

// Styling

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
  },

});

