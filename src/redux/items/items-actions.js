// import { itemsTypes } from './items-types';
import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const ADD = createAction('items/add', (name, number) => {
  const id = uuidv4();
  return {
    payload: { id, name, number },
  };
});

export const ADD_MUTIPLY_CONTACTS = createAction('items/add_multiply_contacts');

export const REMOVE = createAction('items/remove');

export const REMOVE_ALL = createAction('items/remove_all');

// export const ADD = (name, number) => {
//   const id = uuidv4();
//   return {
//     type: itemsTypes.ADD,
//     payload: { id, name, number },
//   };
// };

// export const ADD_MUTIPLY_CONTACTS = (contactsList) => ({
//   type: itemsTypes.ADD_MUTIPLY_CONTACTS,
//   payload: contactsList,
// });

// export const REMOVE = (item) => ({
//   type: itemsTypes.REMOVE,
//   payload: item,
// });

// export const REMOVE_ALL = () => ({
//   type: itemsTypes.REMOVE_ALL,
//   payload: [],
// });
