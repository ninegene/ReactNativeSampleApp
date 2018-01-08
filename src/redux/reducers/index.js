import sequence from './sequence';
import ideas from './ideas';
import groups from './groups';

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

// need to export as object for persistCombineReducers()
export default {
  sequence,
  ideas,
  groups,
};
