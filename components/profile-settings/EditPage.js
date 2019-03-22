import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Text
} from "react-native";
import {
  addToDatabase,
  getFromDatabase
} from "../profile-settings/changeDb.js";

export default class EditPage extends React.Component {
  state = {
    aboutMe: "",
    activities: [],
    gym: "",
    hours: "",
    image: "",
    location: "",
    first: "",
    last: ""
  };
  static navigationOptions = {
    title: "Edit Page"
  };

  addTODatabase() {
    return addToDatabase(this.state, "gabypernama");
  }

  componentDidMount() {
    getFromDatabase("gabypernama").then(snapshot => {
      let data = snapshot.val();
      let {
        aboutMe,
        activities,
        gym,
        hours,
        image,
        location,
        first,
        last
      } = data;
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
    });
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.text}>Name: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.shortBox}
            value={`${this.state.first}`}
            placeholder="   First"
            placeholderTextColor="#808080"
            onChangeText={first => {
              this.setState({ first });
            }}
          />
          <TextInput
            style={styles.shortBox}
            value={`${this.state.last}`}
            placeholder="   Last"
            placeholderTextColor="#808080"
            onChangeText={last => {
              this.setState({ last });
            }}
          />
        </View>
        <Text style={styles.text}>{"\n"}Activities You Enjoy: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.longBox}
            value={`${this.state.activities}`}
            placeholder="   Biking, Running, etc.."
            placeholderTextColor="#808080"
            onChangeText={activities =>
              this.setState({ activities }, () =>
                console.log(this.state.activities)
              )
            }
          />
        </View>
        <Text style={styles.text}>{"\n"}Gym: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.longBox}
            value={`${this.state.gym}`}
            placeholder="   24 HR Fitness, City Sports, etc.."
            placeholderTextColor="#808080"
            onChangeText={gym => {
              this.setState({ gym }, () => console.log(this.state.gym));
            }}
          />
        </View>
        <Text style={styles.text}>{"\n"}Location: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.longBox}
            value={`${this.state.location}`}
            placeholder="   Los Angeles, San Francisco, etc.."
            placeholderTextColor="#808080"
            onChangeText={location => {
              this.setState({ location }, () =>
                console.log(this.state.location)
              );
            }}
          />
        </View>
        <Text style={styles.text}>{"\n"}About Me: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.aboutMe}
            value={`${this.state.aboutMe}`}
            placeholder="ex. I love my deadlifts and squats, could use someone to help me get into cardio more"
            placeholderTextColor="#808080"
            numberOfLines={10}
            multiline={true}
            onChangeText={aboutMe => {
              this.setState({ aboutMe }, () => console.log(this.state));
            }}
          />
        </View>
        <Button
          title="Save"
          onPress={
            () =>
              this.addTODatabase().then(
                this.props.navigation.navigate("DisplayProfile")
              )
            // this.addTODatabase().then(
            //   this.props.navigation.navigate("DisplayProfile")
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  shortBox: {
    height: 30,
    width: "45%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 4,
    borderRadius: 6
  },
  longBox: {
    height: 30,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 4,
    borderRadius: 6
  },
  aboutMe: {
    height: 150,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 4,
    borderRadius: 6,
    justifyContent: "flex-start",
    textAlign: "left"
  },
  text: {
    paddingLeft: 10,
    marginTop: 10
  }
});
