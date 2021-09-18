import { filterTypes } from './filter-types';

export const filterReducer = (filter = '', { type, payload }) => {
  switch (type) {
    case filterTypes.CLEAR:
    case filterTypes.SET:
      return (filter = payload);

    default:
      return filter;
  }
};
