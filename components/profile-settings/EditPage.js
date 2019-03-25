import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Image
} from "react-native";
import {
  addToDatabase,
  getFromDatabase
} from "../profile-settings/changeDb.js";
import { storage } from "../../firebase/firebase.js";
import { ImagePicker, Permissions } from "expo";
const storageRef = storage.ref();

export default class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: "",
      activities: "",
      gym: "",
      hours: "",
      image: "https://s3-us-west-1.amazonaws.com/abibasnavbar/Coco+cute.jpg",
      location: "",
      first: "",
      last: ""
    };
    this.splitArr = this.splitArr.bind(this);
    this.getCurrentChanges = this.getCurrentChanges.bind(this);
    this.useCameraHandler = this.useCameraHandler.bind(this);
    this.useImageHandler = this.useImageHandler.bind(this);
    this.handleImagePicked = this.handleImagePicked.bind(this);
    this.uploadImageAsync = this.uploadImageAsync.bind(this);
  }
  static navigationOptions = {
    title: "Edit Page"
  };

  componentDidMount() {
    getFromDatabase("gabypernama", this.getCurrentChanges);
  }

  getCurrentChanges(snapshot) {
    let data = snapshot.val();
    let {
      aboutMe,
      activities,
      gym,
      hours,
      location,
      first,
      last,
      image
    } = data;
    this.setState({
      aboutMe,
      activities,
      gym,
      hours,
      location,
      first,
      last,
      image
    });
  }

  useCameraHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this.handleImagePicked(pickerResult);
  };

  useImageHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3]
    });

    this.handleImagePicked(pickerResult);
    // this.setState({ image: `data:image/jpeg;base64, ${result.base64}` }, () =>
    //   console.log(this.state.image)
    // );

    if (!pickerResult.cancelled) {
    }
  };

  uploadImageAsync = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = e => {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const name = uri.split("/").pop();
    const imageRef = storageRef.child(`userImages/` + `${name}`);
    const snapshot = await imageRef
      .put(blob)
      .then(() => console.log("blob sent!"));

    blob.close();

    return await imageRef.getDownloadURL();
  };

  handleImagePicked = async pickerResult => {
    let uploadUrl = await this.uploadImageAsync(pickerResult.uri);
    this.setState({ image: uploadUrl }, () => {
      console.log(this.state.image);
    });
  };

  splitArr() {
    const userObj = this.state;
    let { activities } = userObj;
    if (typeof activities === "string") {
      activities = activities.split(","); // ["Biking", " running", " walking"]
      userObj.activities = activities;
    }

    addToDatabase(userObj, "gabypernama").then(
      this.props.navigation.navigate("DisplayProfile")
    );
  }

  render() {
    const { image } = this.state;
    return (
      <ScrollView>
        <View style={styles.parentimg}>
          <Image
            source={{
              uri: image
            }}
            style={styles.img}
          />
        </View>
        <View style={styles.container}>
          <Button title="Take Photo" onPress={() => this.useCameraHandler()} />
          <Button title="Choose Photo" onPress={() => this.useImageHandler()} />
        </View>
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
        <Text style={styles.text}>{"\n"}Hours Preferred: </Text>
        <View style={styles.container}>
          <TextInput
            style={styles.longBox}
            value={`${this.state.hours}`}
            placeholder="   Morning"
            placeholderTextColor="#808080"
            onChangeText={hours => {
              this.setState({ hours }, () => console.log(this.state.hours));
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
          onPress={() => {
            this.splitArr();
          }}
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
  parentimg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 5
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
