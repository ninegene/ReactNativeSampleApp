import { StackNavigator } from 'react-navigation';
import _ from 'lodash';
import HomeScreenNavigator from './HomeScreenNavigator';

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreenNavigator
  },
  // add launch screen if necessary
}, {
  headerMode: 'none',
});


const defaultGetStateForAction = AppNavigator.router.getStateForAction;

// Based on: https://reactnavigation.org/docs/routers/#Blocking-Navigation-Actions
//           https://reactnavigation.org/docs/routers/api
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
  return defaultGetStateForAction(action, state);
};

export default AppNavigator;
