import { itemsTypes } from './items-types';
import { v4 as uuidv4 } from 'uuid';

export const ADD = (name, number) => {
  const id = uuidv4();
  return {
    type: itemsTypes.ADD,
    payload: { id, name, number },
  };
};

export const ADD_MUTIPLY_CONTACTS = (contactsList) => ({
  type: itemsTypes.ADD_MUTIPLY_CONTACTS,
  payload: contactsList,
});

export const REMOVE = (item) => ({
  type: itemsTypes.REMOVE,
  payload: item,
});

export const REMOVE_ALL = () => ({
  type: itemsTypes.REMOVE_ALL,
  payload: [],
});
