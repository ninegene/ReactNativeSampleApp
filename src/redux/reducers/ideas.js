// @flow
import * as types from '../types';
import Idea from '../../models/Idea';

const ideas = (state: Array<Idea> = [], action: Object) => {
  switch (action.type) {
    case types.ADD_IDEA:
      return [
        ...state,
        action.idea,
      ];
    case types.UPDATE_IDEA:
      return state.map(idea =>
        (idea.id === action.idea.id)
          ? { ...idea, ...action.idea }
          : idea
      );
    case types.DELETE_IDEA_BY_ID:
      return state.filter(idea => idea.id != action.id);
  }
  return state;
};

export default ideas;
