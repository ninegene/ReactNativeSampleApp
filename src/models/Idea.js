// @flow
import uuidv4 from 'uuid/v4';
import { toPlainObject } from '../util';
// import Group from "./Group";

export default class Idea {
  id: string;
  seq: number;
  title: string;
  body: string;
  tags: Array<string>;
  groupID: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(obj: Object = {}) {
    const curDateTimeString = new Date().toISOString();
    this.id = obj.id || uuidv4();
    this.seq = obj.seq || 0;
    this.title = obj.title || '';
    this.body = obj.body || '';
    this.groupID = obj.groupID || '';
    this.tags = obj.tags || [];
    this.pinned = obj.pinned || false;
    this.createdAt = obj.createdAt || curDateTimeString;
    this.updatedAt = obj.updatedAt || curDateTimeString;
  }

  toPlainObject() {
    return toPlainObject(this, key => !key.startsWith('_'));
    // return {...this};
  }
}
