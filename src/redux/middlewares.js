import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// log actions in development mode
const loggerMiddleware = createLogger({
  collapsed: true,

  // only log in development mode
  predicate: () => __DEV__,
});

// define store middlewares as an array
export default [
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware
];
