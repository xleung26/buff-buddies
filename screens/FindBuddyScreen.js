import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
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
const matches = {
  aqilthanawala: {
  
  },
  jkelly: {
    'aqilthanawala': true
  }
}
const users = [
  { id: '1',
    image: 'http://www.availableideas.com/wp-content/uploads/2016/02/Dog-bites-canvas-shoes-iPhone-6-Wallpaper.jpg',
    name: {
      first: 'Joe',
      last: 'Shoe'
    },
    location: '90025',
    activities: ['Running', 'Lifting'],
    hours: 'Afternoon',
    aboutMe: 'Woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof I like shoes',
    gym: 'LA Fitness'
  },
  { id: '2',
    image: 'http://www.ohlays.com/wallpapers/dog1.jpg',
    name: {
      first: 'Air',
      last: 'Bud'
    },
    location: '90025',
    activities: ['Running', 'Basketball'],
    hours: 'Afternoon',
    aboutMe: 'Bark bark',
    gym: 'LA Fitness'
  },
  { id: 'jkelly',
    image: 'https://wallpaperaccess.com/full/690074.jpg',
    name: {
      first: 'Jun',
      last: 'Kelly'
    },
    location: '90025',
    activities: ['Running', 'Swimming'],
    hours: 'Afternoon',
    aboutMe: 'What\'s up dawg. Just lookin for a chill workout pal.',
    gym: 'LA Fitness'
  },
  { id: '4',
    image: 'https://iphonewalls.net/wp-content/uploads/2015/01/Cute%20Pug%20Dog%20Laughing%20iPhone%206%20Plus%20HD%20Wallpaper-320x480.jpg',
    name: {
      first: 'John',
      last: 'Chewer'
    },
    location: '90025',
    activities: ['Lifting'],
    hours: 'Afternoon',
    aboutMe: 'I like shoes',
    gym: 'LA Fitness'
  },
  { id: '5',
    image: 'https://i.pinimg.com/originals/fd/48/0f/fd480f0e5e1ae24a584587f70664d4ac.jpg',
    name: {
      first: 'Greg',
      last: 'Smith'
    },
    location: '90025',
    activities: ['Running', 'Swimming'],
    hours: 'Afternoon',
    aboutMe: 'Hi I\'m Greg and I want to get swole',
    gym: 'LA Fitness'
  },
];

const storeAndCheckMatch = (currentUser, targetUser) => {
  matches[currentUser][targetUser] = true;
  if (matches[targetUser]) {
    if (matches[targetUser][currentUser]) {
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
  }
}

export default class FindBuddyScreen extends React.Component {
  constructor() {
    super();
    
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      targetUser: null
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, { toValue: { x: screen_width + 100, y: gestureState.dy } }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1, targetUser: users[this.state.currentIndex + 1] ? users[this.state.currentIndex + 1].id : null
}, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
          storeAndCheckMatch(currentUser.id, users[this.state.currentIndex].id);
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
    this.setState({
      targetUser: users[0].id
    });
  }

  renderUsers = () => {
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
            <Image style={styles.blurredImage} source={{uri: item.image}} blurRadius={30}>
            </Image>
          </Animated.View>
        );
      }
    }).reverse();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={{fontSize: 20, paddingTop: 10}}>
            SWIPE CARD TO FIND A BUDDY
          </Text>
        </View>
        <View style={styles.innerContainer}>
          {this.renderUsers()}
        </View>
        <View style={styles.bottomContainer}>
            <Text style={styles.textLeft}>
              {'\u2190'} NO
            </Text>
            <Text style={styles.textRight}>
              YES {'\u2192'}
            </Text>
        </View>
      </View>
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
    backgroundColor: '#F0F8FF',
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
    fontSize: 13,
    lineHeight: 14,
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
