import { StackNavigator } from "react-navigation";
import React, { Component } from "react";
import styles from "./styles/RootContainerStyles";

import LaunchScreen from "./LaunchScreen";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";

// Manifest of possible screens
const RootNavigator = StackNavigator(
  {
    Launch: {
      screen: LaunchScreen,
      headerMode: "none",
      navigationOptions: {}
    },
    Home: {
      screen: HomeScreen,
      headerMode: "none",
      navigationOptions: {}
    },
    Chat: {
      screen: ChatScreen,
      headerMode: "screen",
      navigationOptions: {}
    }
  },
  {
    // Default config for all screens
    initialRouteName: "Launch",
    headerMode: "none",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

class RootContainer extends Component {
  render() {
    return <RootNavigator />;
  }
}

export default RootContainer;
