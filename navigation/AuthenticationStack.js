import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../components/auth/LoginScreen.js';
import SignupScreen from '../components/auth/SignupScreen.js';


const AuthenticationStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Signup: {
      screen: SignupScreen
    }
  },
  {
    initialRouteName: 'Login'
  }
);

module.exports = AuthenticationStack;