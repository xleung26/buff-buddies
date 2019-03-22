import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import FindBuddyScreen from "../screens/FindBuddyScreen";
import MessagesScreen from "../screens/MessagesScreen";
import DisplayProfile from "../components/profile-settings/DisplayProfile.js";
import EditPage from "../components/profile-settings/EditPage.js";

const MessagesStack = createStackNavigator({
  Messages: MessagesScreen
});

MessagesStack.navigationOptions = {
  tabBarLabel: "Messages",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const HomeStack = createStackNavigator({
  Home: FindBuddyScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Find Buddy",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const ProfileStack = createStackNavigator(
  {
    DisplayProfile: {
      screen: DisplayProfile
    },
    EditPage: {
      screen: EditPage
    }
  },
  { initialRouteName: "DisplayProfile" }
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Your Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  MessagesStack
});
