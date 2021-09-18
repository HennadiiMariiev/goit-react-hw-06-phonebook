import { itemsTypes } from './items-types';

export const itemsReducer = (items = [], { type, payload }) => {
  switch (type) {
    case itemsTypes.ADD:
      return [...items, payload];

    case itemsTypes.ADD_MUTIPLY_CONTACTS:
      return [...items, ...payload];

    case itemsTypes.REMOVE:
      return items.filter((item) => item.id !== payload);

    case itemsTypes.REMOVE_ALL:
      return [];

    default:
      return items;
  }
};
