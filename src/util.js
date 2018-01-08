// @flow

export function toPlainObject(fromObj : Object, filterKey : Function = () => true) {
  let obj = {};
  let keys = Object.keys(fromObj);
  for (let k of keys) {
    if (filterKey(k)) {
      obj[k] = fromObj[k];
    }
  }
  return obj;
}
