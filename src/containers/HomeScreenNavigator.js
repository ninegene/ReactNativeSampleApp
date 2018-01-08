import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import _ from 'lodash';
import { Icons } from '../themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PlaygroundScreen from './PlaygroundScreen';
import IdeaNavigator from './IdeaNavigator';
import DeviceInfoScreen from './DeviceInfoScreen';

export const HomeScreenNavigator = TabNavigator({
  Idea: {
    screen: IdeaNavigator,
    navigationOptions: {
      title: 'Ideas',
      tabBarIcon: (props) => (
        <FontAwesomeIcon name="plus" size={Icons.medium} color={props.tintColor} />
      ),
    }
  },
  Playground: {
    screen: PlaygroundScreen,
    navigationOptions: {
      title: 'Playground',
      tabBarIcon: (props) => (
        <MaterialCommunityIcons name="test-tube" size={Icons.medium} color={props.tintColor} />
      ),
    }
  },
  DeviceInfo: {
    screen: DeviceInfoScreen,
    navigationOptions: {
      title: 'Device Info',
      tabBarIcon: (props) => (
        <MaterialIcons name="perm-device-information" size={Icons.medium} color={props.tintColor} />
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
});


const defaultGetStateForAction = HomeScreenNavigator.router.getStateForAction;

// Based on: https://reactnavigation.org/docs/routers/#Blocking-Navigation-Actions
//           https://reactnavigation.org/docs/routers/api
HomeScreenNavigator.router.getStateForAction = (action, state) => {
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

  return defaultGetStateForAction(action, state);
};

export default HomeScreenNavigator;
