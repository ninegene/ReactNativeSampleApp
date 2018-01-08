import { createTransform } from 'redux-persist';
import stringify from 'json-stringify-safe';
import Idea from '../models/Idea';
import Group from '../models/Group';

let modelTransform = createTransform(
  // inbound: transform state coming from redux on its way to being serialized and stored
  (state, key) => {
    __DEV__ && console.log('modelTransform: inbound:', key, state);
    if (Array.isArray(state)) {
      state = state.map(obj => obj.toPlainObject ? obj.toPlainObject() : obj);
    }
    return stringify(state);
  },

  // outbound: transform state coming from storage, on its way to be rehydrated into redux
  (state, key) => {
    __DEV__ && console.log('modelTransform: outbound:', key, state);
    try {
      state = JSON.parse(state);
    } catch (err) {
      if (__DEV__) {
        console.error('modelTransform: error while transforming state', state, err);
      }
    }
    if (Array.isArray(state) && key == 'ideas') {
      state = state.map(obj => new Idea(obj));
    }
    if (Array.isArray(state) && key == 'groups') {
      state = state.map(obj => new Group(obj));
    }
    return state;
  },

  // transform config
  {
    whitelist: ['sequence', 'ideas', 'groups'],
  }
);

export default [
  modelTransform
];
