import { parseConfig, isEmpty } from "./utils";

/**
 * 设置localStorage or sessionStorage
 * @param {string} key  设置的key
 * @param {*} value  设置的值
 * @param {{
 * type?:"localStorage" | "sessionStorage",
 * expire?:number | null,
 * prefix?:number | string
 * }} config type:指定stroage类型,默认值localStorage; expire:指定有效时间,需大于0,单位分钟,默认null;  prefix:指定key的前缀,默认不含前缀
 */
export const setStorage = (key, value, config) => {
  const { type, expire, prefix } = parseConfig(config);
  key = prefix ? prefix + "_" + key : key;
  if (isEmpty(value)) {
    value = null;
  }
  const data = {
    value: value,
    updateTime: Date.now(),
    expire,
  };
  window[type].setItem(key, JSON.stringify(data));
};

/**
 * 获取localStorage or sessionStorage
 * @param {string} key  localStorage or sessionStorage 的 key
 * @param {{
 * type?:"localStorage" | "sessionStorage",
 * prefix?:number | string
 * }} config type:指定stroage类型,默认值localStorage; prefix:指定key的前缀,默认不含前缀
 */
export const getStorage = (key, config) => {
  const { type, prefix } = parseConfig(config);
  key = prefix ? prefix + "_" + key : key;
  if (isEmpty(window[type].getItem(key))) return null;
  const { value, updateTime, expire } = JSON.parse(window[type].getItem(key));
  if (expire && updateTime + expire * 1000 * 60 < Date.now()) {
    removeStorage(key);
    return null;
  } else {
    return value;
  }
};

/**
 * 获取全部localStorage or sessionStorage
 * @param {"localStorage" | "sessionStorage"} type 指定stroage类型,默认值localStorage
 */
export const getAllStorage = (type) => {
  if (!["localStorage", "sessionStorage"].includes(type)) {
    type = "localStorage";
  }
  const result = [];
  const storage = window[type];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    const val = JSON.parse(storage.getItem(key))?.value ?? null;
    result[i] = { key, val };
  }
  return result;
};

/**
 * 移除localStorage or sessionStorage
 * @param {string} key  localStorage or sessionStorage 的 key
 * @param {{
 * type?:"localStorage" | "sessionStorage",
 * prefix?:number | string
 * }} config type:指定stroage类型,默认值localStorage; prefix:指定key的前缀,默认不含前缀
 */
export const removeStorage = (key, config) => {
  const { type, prefix } = parseConfig(config);
  key = prefix ? prefix + "_" + key : key;
  window[type].removeItem(key);
};

/**
 * 清空全部localStorage or sessionStorage
 * @param {"localStorage" | "sessionStorage"} type 指定stroage类型,默认值localStorage
 */
export const clearStorage = (type) => {
  if (!["localStorage", "sessionStorage"].includes(type)) {
    type = "localStorage";
  }
  window[type].clear();
};

export default {
  getStorage,
  setStorage,
  removeStorage,
  clearStorage,
  getAllStorage
}
