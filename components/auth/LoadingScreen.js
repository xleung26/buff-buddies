import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

// import userState from "./authHelpers.js";

export default class Loading extends React.Component {
  componentDidMount() {
    // Check if user is logged in and determine where to navigate
    // userState();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
// Loading Screen Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
