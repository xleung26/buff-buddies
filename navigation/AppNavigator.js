import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthenticationStack from "./AuthenticationStack";

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: {
        screen: MainTabNavigator
      },
      Auth: {
        screen: AuthenticationStack
      }
    },
    {
      initialRouteName: "Auth"
    }
  )
);
// You could add another route here for authentication.
// Read more at https://reactnavigation.org/docs/en/auth-flow.html
