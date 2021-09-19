import { createReducer } from '@reduxjs/toolkit';
// import { itemsTypes } from './items-types';
import { ADD, ADD_MUTIPLY_CONTACTS, REMOVE, REMOVE_ALL } from './items-actions';

export const itemsReducer = createReducer([], {
  [ADD]: (state, { payload }) => [...state, payload],
  [ADD_MUTIPLY_CONTACTS]: (state, { payload }) => [...state, ...payload],
  [REMOVE]: (state, { payload }) => state.filter((item) => item.id !== payload),
  [REMOVE_ALL]: () => [],
});

// export const itemsReducer = (items = [], { type, payload }) => {
// switch (type) {
// case itemsTypes.ADD:
// return [...items, payload];
//
// case itemsTypes.ADD_MUTIPLY_CONTACTS:
// return [...items, ...payload];
//
// case itemsTypes.REMOVE:
// return items.filter((item) => item.id !== payload);
//
// case itemsTypes.REMOVE_ALL:
// return [];
//
// default:
// return items;
// }
// };
