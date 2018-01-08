import { applyMiddleware, createStore, compose } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import middlewares from './middlewares';
import reducers from './reducers';
import transforms from './transforms';

// See https://github.com/rt2zz/redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms,
  debug: __DEV__,
};

const combinedReducers = persistCombineReducers(persistConfig, reducers);

const enhancers = [
  devToolsEnhancer({
    name: 'ReactNativeSampleApp', realtime: true,
  }),
];

// In dev mode, use https://github.com/jhen0409/react-native-debugger
/* eslint-disable no-undef */
const composeEnhancers = (
  __DEV__ &&
  typeof (window) !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

export const store = createStore(combinedReducers, applyMiddleware(...middlewares));
export const persistor = persistStore(store, enhancer);
