const isDevMode = !!__DEV__;
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../Themes";
import { StackNavigator } from "react-navigation";
import codePush from "react-native-code-push";
import _ from "lodash";
import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducer from "../appReducer";

import HomeScreen from "./HomeScreen";
import DeviceInfoScreen from "./DeviceInfoScreen";

// See: https://microsoft.github.io/code-push/docs/react-native.html#link-6
// See: https://microsoft.github.io/code-push/docs/react-native.html#link-10
// When an update is available, prompt the end user for permission
// before downloading it, and then immediately apply the update.
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  // installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryBackground,
  }
});

const store = createStore(appReducer);

// Manifest of possible screens
const AppNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    DeviceInfo: {
      screen: DeviceInfoScreen
    },
  },
  {
    // Default config for all screens
    initialRouteName: "Home",
    // headerMode: "none",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

const defaultGetStateForAction = AppNavigator.router.getStateForAction;

// Based on: https://reactnavigation.org/docs/routers/#Blocking-Navigation-Actions
//           https://reactnavigation.org/docs/routers/api
AppNavigator.router.getStateForAction = (action, state) => {
  let lastRoute = state && state.routes[state.index];
  const sameRouteName = state && action.routeName === lastRoute.routeName;
  const sameParams = state && _.isEqual(action.params, lastRoute.params);

  // Prevent navigating twice when clicking a button quickly
  // https://github.com/react-community/react-navigation/issues/271
  if (sameRouteName && sameParams) {
    // Returning null from getStateForAction means that the action
    // has been handled/blocked, but there is not a new state
    return null;
  }

  /*
  // action has the following form
  {
    type: "Navigation/NAVIGATE",
    routeName: "Home",
    params: {…}
  }

  // state has the following form
  {
    index: 1, // identifies which route in the routes array is active
    routes: [
      {
        // Each route needs a name to identify the type.
        routeName: 'MyRouteName',

        // A unique identifier for this route in the routes array:
        key: 'myroute-123',
        // (used to specify the re-ordering of routes)

        // Routes can have any data, as long as key and routeName are correct
        ...randomRouteData,
      },
      ...moreRoutes,
    ]
  }
  */

  return defaultGetStateForAction(action, state);
};

class App extends Component {
  // someEvent() {
  //   // call navigate for AppNavigator here if necessary from top level component only
  //   this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName, params });
  // }

  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("Up-to-date.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed.");
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log(
      progress.receivedBytes + " of " + progress.totalBytes + " received."
    );
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={nav => {
            this.navigator = nav;
          }}
        />
      </Provider>
    );
  }
}

if (!isDevMode) {
  // eslint-disable-next-line no-class-assign
  App = codePush(codePushOptions)(App);
}

export default App;
