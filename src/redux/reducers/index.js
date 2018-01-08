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
  ideas: [],  // Array<Idea>
  groups: [], // Array<Group>
}
*/

// need to export as object for persistCombineReducers()
export default {
  sequence,
  ideas,
  groups,
};
