import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import DisplayProfile from "../components/profile-settings/DisplayProfile.js";
import EditPage from "../components/profile-settings/EditPage.js";

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

export default ProfileStack;
