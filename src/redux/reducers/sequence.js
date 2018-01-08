// @flow
import * as types from '../types';

const sequence = (state: Object = { idea: 0, group: 0 }, action: Object) => {
  switch (action.type) {
    case types.INCREMENT_IDEA_SEQ:
      return {
        ...state,
        idea: state.idea + 1,
      };
    case types.INCREMENT_GROUP_SEQ:
      return {
        ...state,
        group: state.group + 1,
      };
  }
  return state;
};

export default sequence;
