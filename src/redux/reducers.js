// @flow
import * as types from './types';
import Idea from '../models/Idea';

// https://redux.js.org/docs/basics/Reducers.html#designing-the-state-shape
// The State Shape
/*
{
  sequence: {
    idea: 0,
    group: 0,
  },
  ideas: [
    {
      id: "<uuid>",
      seq: seq.idea++,
      group: "<group_id>",
      content: "",
      tag: [
        "tag1",
        "tag2",
      ],
      createdAt: "2017-11-12T18:01:57.134Z",
      updatedAt: "2017-11-12T18:01:57.134Z",
      deletedAt: "2017-11-12T18:01:57.134Z",
    },
    ...
  ],
  deletedIdeas: [
    {
      id: "<uuid>",
      seq: 0,
      group: "<group_id>",
      content: "",
      tag: [
        "tag1"
      ],
      createdAt: "2017-11-12T18:01:57.134Z",
      updatedAt: "2017-11-12T18:01:57.134Z",
      deletedAt: "2017-11-12T18:01:57.134Z",
    },
    ...
  ],
  group: [
    {
      id: "<uuid>",
      seq: seq.group++,
      name: "",
      description: "",
      createdAt: "2017-11-12T18:01:57.134Z",
      updatedAt: "2017-11-12T18:01:57.134Z",
      deletedAt: "2017-11-12T18:01:57.134Z",
    },
    ...
  ],
  deletedGroups: [
    {
      id: "<uuid>",
      seq: seq.group++,
      name: "",
      description: "",
      createdAt: "2017-11-12T18:01:57.134Z",
      updatedAt: "2017-11-12T18:01:57.134Z",
      deletedAt: "2017-11-12T18:01:57.134Z",
    },
    ...
  ],
  ideaSearchTerms: [
    "search term1",
    ...
  ]
}
*/

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

const groups = (state: Array<Idea> = [], action: Object) => {
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

// const ideaSeq = (state : number = 0, action: Object) => {
//   switch (action.type) {
//     case types.INCREMENT_IDEA_SEQ:
//       return state + 1;
//   }
//   return state;
// };

// const groupSeq = (state : number = 0, action: Object) => {
//   switch (action.type) {
//     case types.INCREMENT_GROUP_SEQ:
//       return state + 1;
//   }
//   return state;
// };

// need to export as object for persistCombineReducers()
export default {
  sequence,
  ideas,
  groups,
};
