import { combineReducers } from "redux";

const todos = (state = [], action) => {
  let nextState;
  switch (action.type) {
    case 'ADD_TODO':
      nextState = [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        }
      ];
      break;
    case 'TOGGLE_TODO':
      nextState = state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      );
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  let nextState;
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      nextState = action.filter;
  }
  return nextState || state;
};

const AppReducer = combineReducers({
  todos,
  visibilityFilter,
});

export default AppReducer;
