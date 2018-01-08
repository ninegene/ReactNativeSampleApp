// @flow
import * as types from '../types';
import Group from '../../models/Group';

function _incrementGroupSeq() {
  return {
    type: types.INCREMENT_GROUP_SEQ,
  };
}

function _addGroup(group : Group) {
  return {
    type: types.ADD_GROUP,
    group,
  };
}

export function addGroup(group : Group) {
  return (dispatch: Function, getState: Function) => {
    const { sequence } = getState();
    group.seq = sequence.group;
    dispatch(_incrementGroupSeq());
    dispatch(_addGroup(group));
  };
}

export function updateGroup(group : Group) {
  return {
    type: types.UPDATE_GROUP,
    group,
  };
}

export function deleteGroupByID(id : string) {
  return {
    type: types.DELETE_GROUP_BY_ID,
    id,
  };
}
