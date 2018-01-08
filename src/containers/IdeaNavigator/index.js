import { StackNavigator } from 'react-navigation';
import _ from 'lodash';

import IdeaListScreen from './IdeaListScreen';
import IdeaCreateScreen from './IdeaCreateScreen';

// Root navigator is a StackNavigator
const IdeaNavigator = StackNavigator({
  IdeaList: {
    screen: IdeaListScreen,
  },
  IdeaCreate: {
    screen: IdeaCreateScreen,
  },
}, {
  headerMode: 'none',
  mode: 'modal',
  // navigationOptions: {
  //   gesturesEnabled: false,
  // },
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 300,
  //     easing: Easing.out(Easing.poly(4)),
  //     timing: Animated.timing,
  //   },
  //   screenInterpolator: sceneProps => {
  //     const { layout, position, scene } = sceneProps;
  //     const { index } = scene;

  //     const height = layout.initHeight;
  //     const translateY = position.interpolate({
  //       inputRange: [index - 1, index, index + 1],
  //       outputRange: [height, 0, 0],
  //     });

  //     const opacity = position.interpolate({
  //       inputRange: [index - 1, index - 0.99, index],
  //       outputRange: [0, 1, 1],
  //     });

  //     return { opacity, transform: [{ translateY }] };
  //   },
  // }),
});


const defaultGetStateForAction = IdeaNavigator.router.getStateForAction;

// Based on: https://reactnavigation.org/docs/routers/#Blocking-Navigation-Actions
//           https://reactnavigation.org/docs/routers/api
IdeaNavigator.router.getStateForAction = (action, state) => {
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

export default IdeaNavigator;
