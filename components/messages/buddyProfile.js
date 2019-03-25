import React from "react";
import { chatStore } from "../../firebase/chatDB.js";
import {
  SectionList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button
} from "react-native";
import { getFromDatabase } from "../profile-settings/changeDb.js";
import { Avatar, Input } from "react-native-elements";

const screen_height = Dimensions.get('window').height;
const screen_width = Dimensions.get('window').width;


class DisplayProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: "Hi, i love deadlifts and spa dates",
      activities: ["biking", "swimming", "`fun stuff"],
      gym: "25 Hr fitness",
      hours: "3am",
      image: "url",
      location: "fine",
      first: "",
      last: ""
    };
    this.getProfile = this.getProfile.bind(this);
  }

  getProfile = snapshot => {
    let test = snapshot.val();
    let {
      aboutMe,
      activities,
      gym,
      hours,
      image,
      location,
      first,
      last
    } = test;
    this.setState({
      aboutMe,
      activities,
      gym,
      hours,
      image,
      location,
      first,
      last
    });
  };

  componentDidMount() {
    getFromDatabase(this.props.buddy, this.getProfile);
  }

  render() {
      return (
        <ScrollView
        style = {{width: screen_width, height: screen_height}}
        >
          <View style={styles.container}>
          <Button
                onPress = {() => this.props.handleBuddyProfile(null)} 
                title = {`back`}
            >
            </Button>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri: this.state.image //this will be this.state.url
              }}
            />
            <Text style={styles.name}>
              {this.state.first} {this.state.last}
            </Text>
          </View>
          <View style={styles.activities}>
            <Text style={styles.activitiesHeader}>{"\n"}Activities: </Text>
            <Text style={styles.activitiesText}>
              {this.state.activities.map((activity, i) => {
                if (i === this.state.activities.length - 1) {
                  return <Text key={i}> {activity}</Text>;
                }
                return <Text key={i}> {activity},</Text>;
              })}
            </Text>
          </View>
          <View style={styles.activities}>
            <Text style={styles.activitiesHeader}>Gym Membership: </Text>
            <Text style={styles.activitiesText}>{this.state.gym}</Text>
          </View>
          <View style={styles.activities}>
            <Text style={styles.activitiesHeader}>Usual Workout Time: </Text>
            <Text style={styles.activitiesText}>{this.state.hours}</Text>
          </View>
          <View style={styles.activities}>
            <Text style={styles.activitiesHeader}>Location: </Text>
            <Text style={styles.activitiesText}>{this.state.location}</Text>
          </View>
          <View style={styles.activities}>
            <Text style={styles.activitiesHeader}>About Me:</Text>
            <Text style={styles.aboutMeText}>{this.state.aboutMe}</Text>
          </View>
        </ScrollView>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    paddingTop: 15
  },
  activities: {
    display: "flex",
    flexDirection: "column"
  },
  activitiesHeader: {
    paddingBottom: 5,
    fontSize: 17,
    alignSelf: "center",
    paddingLeft: 15,
    fontWeight: "bold"
  },
  activitiesText: {
    fontSize: 17,
    alignSelf: "center",
    paddingBottom: 40
  },
  aboutMeText: {
    fontSize: 17,
    alignSelf: "center",
    paddingRight: 20,
    paddingLeft: 50,
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: "#808080",
    width: "75%",
    height: "45%"
  },
  header: {
    fontSize: 17,
    alignSelf: "center",
    paddingLeft: 15,
    fontWeight: "bold"
  },
  name: {
    fontSize: 20,
    alignSelf: "center"
  }
});

export default DisplayProfile;

/*

<Text>Location: {"\n"}</Text>
<Text>
  {this.state.location}
  {"\n"}
  {"\n"}
</Text>

*/
