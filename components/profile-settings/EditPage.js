import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Text
} from "react-native";
import { addToDatabase } from "../profile-settings/changeDb.js";

export default class EditPage extends React.Component {
  state = {
    aboutMe: "",
    activities: [],
    gym: "",
    hours: "",
    image: "",
    location: "",
    name: []
  };
  static navigationOptions = {
    title: "Edit Page"
  };

  addTODatabase() {
    return addToDatabase(this.state, "Coco123");
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.text}>Name: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.shortBox}
            placeholder="   First"
            placeholderTextColor="#808080"
            onChangeText={first =>
              this.setState({ name: first }, () => console.log(this.state.name))
            }
          />
          <TextInput
            style={styles.shortBox}
            placeholder="   Last"
            placeholderTextColor="#808080"
            onChangeText={last =>
              this.setState({ name: last }, () => console.log(this.state.name))
            }
          />
        </View>
        <Text style={styles.text}>{"\n"}Activities You Enjoy: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.longBox}
            placeholder="   Biking, Running, etc.."
            placeholderTextColor="#808080"
          />
        </View>
        <Text style={styles.text}>{"\n"}Gym: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.longBox}
            placeholder="   24 HR Fitness, City Sports, etc.."
            placeholderTextColor="#808080"
          />
        </View>
        <Text style={styles.text}>{"\n"}Location: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.longBox}
            placeholder="   Los Angeles, San Francisco, etc.."
            placeholderTextColor="#808080"
          />
        </View>
        <Text style={styles.text}>{"\n"}About Me: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.aboutMe}
            placeholder="I love my deadlifts and squats, could use someone to help me get into cardio more"
            placeholderTextColor="#808080"
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <Button
          title="Save"
          onPress={() =>
            this.addTODatabase().then(
              this.props.navigation.navigate("DisplayProfile")
            )
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
