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
    uri: 'http://www.availableideas.com/wp-content/uploads/2016/02/Dog-bites-canvas-shoes-iPhone-6-Wallpaper.jpg'
  },
  { id: '2',
    uri: 'https://iphonewalls.net/wp-content/uploads/2015/01/Cute%20Pug%20Dog%20Laughing%20iPhone%206%20Plus%20HD%20Wallpaper-320x480.jpg'
  },
  { id: '3',
    uri: 'http://www.ohlays.com/wallpapers/dog1.jpg'
  },
];

export default class FindBuddyScreen extends React.Component {
  constructor(props) {
    super(props);
    
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
      if (i < this.state.currentIndex) {
        return null;
      } else if (i === this.state.currentIndex) {
        return (
          <Animated.View 
            {...this.PanResponder.panHandlers} 
            key={item.id} style={[{transform: this.position.getTranslateTransform()}, {height: screen_height - 120, width: screen_width, padding: 10, position: 'absolute'}]}>
            <Image style={styles.userImage} source={{uri: item.uri}}>
            </Image>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View 
            key={item.id} style={[{height: screen_height - 120, width: screen_width, padding: 10, position: 'absolute'}]}>
            <Image style={styles.userImage} source={{uri: item.uri}}>
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
    backgroundColor: 'white',
  },
  topContainer: {
    height: 40
  },
  bottomContainer: {
    height: 100
  },
  innerContainer: {
    flex: 1,
    zIndex: 10
  },
  animatedContainer: {
    height: screen_height - 300,
    width: screen_width,
    backgroundColor: 'white'
  },
  userImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    padding: 10,
    borderRadius: 20
  },
  text: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  }
});
