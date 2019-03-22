import React from "react";
import { Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import DisplayProfile from "../components/profile-settings/DisplayProfile.js";
import EditPage from "../components/profile-settings/EditPage.js";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };
  render() {
    return <DisplayProfile />;
  }
}
