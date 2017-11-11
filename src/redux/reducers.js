import * as types from "./types";

// Note: redux-persist v5.2.2 rehydrated array as object
const todos = (state = { seq: 0, todos: [] }, action) => {
  let nextState;
  let seq = state.seq;
  switch (action.type) {
    case types.ADD_TODO:
      seq += 1;
      nextState = {
        seq,
        todos: [
          ...state.todos,
          {
            id: seq,
            text: action.text,
            completed: false,
          }
        ]
      };
      break;
    case types.TOGGLE_TODO:
      nextState = {
        seq,
        todos: state.todos.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      };
      break;
    case types.DELETE_ALL_TODOS:
      nextState = {
        seq: 0,
        todos: []
      };
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

// need to export as object for persistCombineReducers()
export default {
  todos,
};
