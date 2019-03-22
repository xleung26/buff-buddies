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
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
const users = [
  { id: '1',
    image: 'http://www.availableideas.com/wp-content/uploads/2016/02/Dog-bites-canvas-shoes-iPhone-6-Wallpaper.jpg',
    name: {
      first: 'Dog',
      last: 'Alpha'
    },
    location: '90025',
    activities: ['Running', 'Fetch'],
    hours: 'Afternoon',
    aboutMe: 'Woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof woof',
    gym: 'the park'
  },
  { id: '2',
    image: 'https://iphonewalls.net/wp-content/uploads/2015/01/Cute%20Pug%20Dog%20Laughing%20iPhone%206%20Plus%20HD%20Wallpaper-320x480.jpg',
    name: {
      first: 'Dawg',
      last: 'Beta'
    },
    location: '90025',
    activities: ['Walking', 'Biting'],
    hours: 'Afternoon',
    aboutMe: 'I\'m a dog',
    gym: 'beach'
  },
  { id: '3',
    image: 'http://www.ohlays.com/wallpapers/dog1.jpg',
    name: {
      first: 'Air',
      last: 'Bud'
    },
    location: '90025',
    activities: ['Jumping', 'Basketball'],
    hours: 'Afternoon',
    aboutMe: 'Bark bark',
    gym: 'Staples Center'
  },
];

export default class FindBuddyScreen extends React.Component {
  constructor() {
    super();
    
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
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
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, { toValue: { x: - screen_width - 100, y: gestureState.dy } }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
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
              <Text style={styles.profileText}>
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
                Preferred Time: {item.hours}s
              </Text>
              <Text style={styles.profileText}>
                Preferred Location: {item.gym}
              </Text>
            </View>

          </Animated.View>
        );
      } else {
        return (
          <Animated.View 
            key={item.id} style={[styles.animatedContainer, {padding: 0}]}>
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
        </View>
        <View style={styles.innerContainer}>
          {this.renderUsers()}
        </View>
        <View style={styles.bottomContainer}>
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
    backgroundColor: '#F5F5DC',
  },
  topContainer: {
    height: 80,
    marginBottom: 100
  },
  bottomContainer: {
    height: 200
  },
  innerContainer: {
    flex: 1,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userDetails: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 20
  },
  animatedContainer: {
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 20,
    height: screen_height - 200,
    width: screen_width - 50,
    backgroundColor: '#FFF',
    padding: 10,
    position: 'absolute',
    borderRadius: 20,
  },
  userImage: {
    flex: 1,
    height: '50%',
    width: null,
    resizeMode: 'cover',
    padding: 20,
    borderRadius: 20
  },
  blurredImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 20
  },
  headerText: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  profileText: {
    marginTop: 10,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 20,
    lineHeight: 19,
    textAlign: 'center',
  },
});
