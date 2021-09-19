import { filterTypes } from './filter-types';

export const SET = (text) => ({
  type: filterTypes.SET,
  payload: text,
});
