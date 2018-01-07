import * as types from './types';

export const addTodo = text => {
  return {
    type: types.ADD_TODO,
    text
  };
};

export const toggleTodo = id => {
  return {
    type: types.TOGGLE_TODO,
    id
  };
};

export const deleteAllTodos = () => {
  return {
    type: types.DELETE_ALL_TODOS,
  };
};
