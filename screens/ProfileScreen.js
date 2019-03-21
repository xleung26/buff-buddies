import React from "react";
import { ExpoConfigView } from "@expo/samples";
import DisplayProfile from "../components/profile-settings/DisplayProfile.js";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  render() {
    return <DisplayProfile />;
  }
}
