import React from "react";
import {
  SectionList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from "react-native";
import { getFromDatabase } from "../profile-settings/changeDb.js";
import { Avatar, Input } from "react-native-elements";
import EditPage from "./EditPage.js";

class DisplayProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: "Hi, i love deadlifts and spa dates",
      activities: ["biking", "swimming", "fun stuff"],
      gym: "25 Hr fitness",
      hours: "3am",
      image: "url",
      location: "fine",
      name: [{ first: "Jane", last: "Doe" }],
      change: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerRight: (
        <Button
          title="Edit"
          color="#242424"
          onPress={() => console.log(this.props.navigation)}
        />
      )
    };
  };

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
          <Text>Name: </Text>{" "}
          <Text>
            {this.state.name.first} {this.state.name.last} {"\n"}
            {"\n"}
          </Text>
          <Text>Favorite Gym Activities: </Text>
          <Text>
            {this.state.activities.map((activity, i) => {
              if (i === this.state.activities.length - 1) {
                return <Text key={i}> {activity}</Text>;
              }
              return <Text key={i}> {activity},</Text>;
            })}{" "}
            {"\n"}
            {"\n"}
          </Text>
          <Text>Gym Membership: </Text>
          <Text>
            {this.state.gym} {"\n"}
            {"\n"}
          </Text>
          <Text>Usual Workout Time: </Text>
          <Text>
            {this.state.hours}
            {"\n"}
            {"\n"}
          </Text>
          <Text>Location: </Text>
          <Text>
            {this.state.location}
            {"\n"}
            {"\n"}
          </Text>
          <Text>About Me: {"\n"}</Text>
          <Text>{this.state.aboutMe}</Text>
        </Text>
      </ScrollView>
    );
  }
}

export default DisplayProfile;
