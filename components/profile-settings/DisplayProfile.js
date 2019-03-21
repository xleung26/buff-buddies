import React from "react";
import { SectionList, Image, StyleSheet, Text, View } from "react-native";
import {
  addToDatabase,
  updateDatabase,
  deleteFromDatabase,
  getFromDatabase
} from "../profile-settings/changeDb.js";
import { Avatar, Input } from "react-native-elements";

export default class DisplayProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: "Hi, i love deadlifts and spa dates",
      activities: ["biking", "swimming", "fun stuff"],
      gym: "25 Hr fitness",
      hours: "3am",
      image: "url",
      location: "fine",
      name: [{ first: "Jane", last: "Doe" }]
    };
  }

  componentDidMount() {
    getFromDatabase("aqilthanawala").then(snapshot => {
      console.log(snapshot);
    });
  }

  render() {
    return (
      <View>
        <Avatar
          rounded
          source={{
            uri: "https://s3-us-west-1.amazonaws.com/abibasnavbar/Coco+cute.jpg"
          }}
        />
      </View>
    );
  }
}
