import {applyMiddleware, createStore, compose} from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import middlewares from './middlewares';
import reducers from './reducers';

// See https://github.com/rt2zz/redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
};

const reducer = persistCombineReducers(persistConfig, reducers);

const enhancers = [
  applyMiddleware(...middlewares),
  devToolsEnhancer({
    name: 'ideanota', realtime: true,
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

export const store = createStore(reducer);
export const persistor = persistStore(store, enhancer);
