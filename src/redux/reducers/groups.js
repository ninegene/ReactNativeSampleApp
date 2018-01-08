// @flow
import * as types from '../types';
import Group from '../../models/Group';

const groups = (state: Array<Group> = [], action: Object) => {
  switch (action.type) {
    case types.ADD_GROUP:
      return [
        ...state,
        action.group,
      ];
    case types.UPDATE_GROUP:
      return state.map(group =>
        (group.id === action.group.id)
          ? { ...group, ...action.group }
          : group
      );
    case types.DELETE_GROUP_BY_ID:
      return state.filter(group => group.id != action.id);
  }
  return state;
};

export default groups;
