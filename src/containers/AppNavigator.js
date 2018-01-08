import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import _ from 'lodash';
import { Icons } from '../themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import WelcomeScreen from './WelcomeScreen';
import IdeaNavigator from './IdeaNavigator';
import DeviceInfoScreen from './DeviceInfoScreen';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Idea: {
    screen: IdeaNavigator,
    navigationOptions: {
      title: 'Ideas',
      tabBarIcon: (props) => (
        <FontAwesomeIcon name="plus" size={Icons.medium} color={props.tintColor} />
      ),
    }
  },
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      title: 'Welcome',
      tabBarIcon: (props) => (
        <Icon name="home" size={Icons.medium} color={props.tintColor} />
      ),
    }
  },
  DeviceInfo: {
    screen: DeviceInfoScreen,
    navigationOptions: {
      title: 'Device Info',
      tabBarIcon: (props) => (
        <Icon name="perm-device-information" size={Icons.medium} color={props.tintColor} />
      ),
    }
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: false,
  tabBarOptions: {
    ...Platform.select({
      android: {
        // activeTintColor: "red",
        // indicatorStyle: { backgroundColor: "white" },
        // style: { backgroundColor: "black" }
      }
    }),
  },
  // navigationOptions: {
  //   header: null,
  //   // title: "Idea Nota - Untitled", // override it
  //   // headerTitleStyle: {
  //   //   color: Colors.headerTitleColor
  //   // },
  //   // headerStyle: {
  //   //   backgroundColor: Colors.headerBgColor,
  //   //   elevation: 0 // disable header elevation when TabNavigator visible
  //   // },
  // }
});

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {
    screen: MainScreenNavigator
  },
}, {
  headerMode: 'none',
});


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
        routeName: "MyRouteName",

        // A unique identifier for this route in the routes array:
        key: "myroute-123",
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

export default AppNavigator;
