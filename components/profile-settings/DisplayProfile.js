import React from "react";
import {
  SectionList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
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
      let test = snapshot.val();
      let { aboutMe, activities, gym, hours, image, location, name } = test;
      this.setState({ aboutMe, activities, gym, hours, image, location, name });
    });
  }

  render() {
    return (
      <ScrollView>
        <Avatar
          rounded
          source={{
            uri: "https://s3-us-west-1.amazonaws.com/abibasnavbar/Coco+cute.jpg"
          }}
        />
        <Text>
          Name: {this.state.name.first}
          {this.state.name.last} {"\n"}
          Favorite Gym Activities:{" "}
          {this.state.activities.map((activity, i) => {
            if (i === this.state.activities.length - 1) {
              return <Text key={i}> {activity}</Text>;
            }
            return <Text key={i}> {activity},</Text>;
          })}{" "}
          {"\n"}
          Gym Membership: {this.state.gym} {"\n"}
        </Text>
      </ScrollView>
    );
  }
}
