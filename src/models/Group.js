// @flow
import uuidv4 from 'uuid/v4';
import { toPlainObject } from '../util';
// import Idea from "./Idea";

export const DEFAULT_GROUP_NAME = 'Unnammed';

export default class Group {
  id: string;
  seq: number;
  name: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(obj: Object = {}) {
    const curDateStr = new Date().toISOString();
    this.id = obj.id || uuidv4();
    this.seq = obj.seq || 0;
    this.name = obj.name || DEFAULT_GROUP_NAME;
    this.pinned = obj.pinned || false;
    this.createdAt = obj.createdAt || curDateStr;
    this.updatedAt = obj.updatedAt || curDateStr;
  }

  toPlainObject() {
    // return {...this};
    return toPlainObject(this, key => !key.startsWith('_'));
  }
}
