// @flow
import * as types from './types';
import Idea from '../models/Idea';
import Group from '../models/Group';

function _incrementIdeaSeq() {
  return {
    type: types.INCREMENT_IDEA_SEQ,
  };
}

function _addIdea(idea : Idea) {
  return {
    type: types.ADD_IDEA,
    idea,
  };
}

export function addIdea(idea : Idea) {
  return (dispatch: Function, getState: Function) => {
    const { sequence } = getState();
    idea.seq = sequence.idea;
    dispatch(_addIdea(idea));
    dispatch(_incrementIdeaSeq());
  };
}

export function updateIdea(idea : Idea) {
  return {
    type: types.UPDATE_IDEA,
    idea,
  };
}

export function deleteIdeaByID(id : string) {
  return {
    type: types.DELETE_IDEA_BY_ID,
    id,
  };
}

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
    dispatch(_addGroup(group));
    dispatch(_incrementGroupSeq());
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
