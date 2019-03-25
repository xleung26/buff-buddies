import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { chatStore } from '../firebase/chatDB.js';
import { getUsers, storeAndCheckMatch } from '../firebase/findMatches.js';
const currentUser = {
  id: 'aqilthanawala',
  name: {
    first: 'Aqil',
    last: 'Thanawala'
  },
  location: '90025',
  activities: ['Running'],
  hours: 'Afternoon',
  gym: 'LA Fitness',
}

const matchCheckHandler = (currentUser, targetUser) => {
  storeAndCheckMatch(currentUser, targetUser, (isMatch) => {
    if (isMatch) {
      chatStore(currentUser, targetUser);
      Alert.alert(
      'Matched found!',
        `${targetUser} wants to workout with you`,
        [
          {
            text: 'Send a message', onPress: () => {
              console.log('message:', targetUser, currentUser);
            }
          },
          {
            text: 'Keep searching', onPress: () => {
              console.log('continue');
            },
            style: 'cancel'
          }
        ],
        {cancelable: false},
      );
    }
  });
}

export default class FindBuddyScreen extends React.Component {
  constructor() {
    super();
    
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      targetUser: null,
      users: []
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    getUsers('90025', currentUser.id, (data) => {
      this.setState({
        targetUser: data[0].id,
        users: data
      });
    });
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        let users = this.state.users;
        if (gestureState.dx > 120) {
          Animated.spring(this.position, { toValue: { x: screen_width + 100, y: gestureState.dy } }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1, targetUser: users[this.state.currentIndex + 1] ? users[this.state.currentIndex + 1].id : null
}, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
          matchCheckHandler(currentUser.id, users[this.state.currentIndex].id);
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, { toValue: { x: - screen_width - 100, y: gestureState.dy } }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1, targetUser: users[this.state.currentIndex + 1] ? users[this.state.currentIndex + 1].id: null
 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, { toValue: { x: 0, y: 0 }, friction: 4 }).start();
        }
      }
    });
  }

renderUsers = () => {
  let users = this.state.users;
    if (this.state.currentIndex >= users.length) {
      return (
        <View>
          <Text>
            No more users :( Try again later
          </Text>
        </View>
      );
    } else {
    return users.map((item, i) => {
      let activitiesLength = item.activities.length;
      if (i < this.state.currentIndex) {
        return null;
      } else if (i === this.state.currentIndex) {
        return (
          <Animated.View 
            {...this.PanResponder.panHandlers} 
            key={item.id} style={[styles.animatedContainer, {transform: this.position.getTranslateTransform()}]} >

            <View style={styles.cardHeader}>
              <Text style={styles.headerText}>
                {item.name.first} {item.name.last[0]}.
              </Text>
            </View>

            <Image style={styles.userImage} source={{uri: item.image}}>
            </Image>

            <View style={styles.userDetails}>
              <Text style={[styles.profileText, {fontStyle: 'italic', marginBottom: 10}]}>
                {item.aboutMe}
              </Text>
              <Text style={styles.profileText}>
                Activities: {item.activities.map((activity, i) => {
                  if (i < activitiesLength - 1) {
                    activity += ', ';
                  }
                return activity})}
              </Text>
              <Text style={styles.profileText}>
                Time of Day: {item.hours}
              </Text>
              <Text style={styles.profileText}>
                Gym: {item.gym}
              </Text>
            </View>

          </Animated.View>
        );
      } else {
        return (
          <Animated.View 
            key={item.id} style={[styles.animatedContainer, {padding: 0, borderWidth: 0}]}>
            <Image style={styles.blurredImage} source={{uri: item.image}} blurRadius={10}>
            </Image>
          </Animated.View>
        );
      }
    }).reverse();
    }
  }

  render() {
    let users = this.state.users;
    return (
      <ImageBackground source={require('../assets/images/fb-splash.png')} style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={{fontSize: 25, paddingTop: 10, color: 'white', fontWeight: 'bold'}}>
            SWIPE CARD TO FIND A MATCH
          </Text>
        </View>
        <View style={styles.innerContainer}>
          {this.renderUsers()}
        </View>
        <View style={styles.bottomContainer}>
        </View>
      </ImageBackground>
    );
  }


  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const screen_height = Dimensions.get('window').height;
const screen_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
      //backgroundColor: '#F7E5E5',
  },
  topContainer: {
    height: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  bottomContainer: {
    height: 40
  },
  innerContainer: {
    flex: 1,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userDetails: {
    position: 'relative',
    marginTop: 5,
    marginBottom: 5
  },
  animatedContainer: {
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 20,
    height: screen_height - 250,
    width: screen_width - 50,
    backgroundColor: '#FFF',
    padding: 8,
    position: 'absolute',
    borderRadius: 20,
  },
  userImage: {
    flex: 1,
    height: '50%',
    width: null,
    resizeMode: 'cover',
    padding: 0,
    borderRadius: 0
  },
  blurredImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 20,
    opacity: .2
  },
  headerText: {
    fontSize: 30,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  profileText: {
    color: 'rgba(0,0,0,0.9)',
    fontSize: 15,
    lineHeight: 17,
    textAlign: 'left',
  },
  textLeft: {
    position: 'absolute',
    left: 30,
    bottom: 0,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red'
  },
  textRight: {
    position: 'absolute',
    right: 30,
    bottom: 0,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'green'
  }
});
