const _prefix = 'YX_1.0.0_';

const Storage = window.localStorage;

export const setStorage = ({key, value}) => {
  value = typeof value === `object` ? JSON.stringify(value) : value;
  Storage.setItem(`${_prefix}${key}`, value);
};

export const getStorage = (key) => {
  const value = Storage.getItem(`${_prefix}${key}`);
  return typeof value === 'string' ? JSON.parse(value) : value;
};

export const removeStorage = (key) => {
  Storage.removeItem(`${_prefix}${key}`);
};

export const clearStorage = (clearAll = false) => {
  if(clearAll) {
    Storage.clear();
  } else {
    Storage.removeItem(`${_prefix}tokenInfo`);
  }
};