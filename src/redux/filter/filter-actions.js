import { filterTypes } from './filter-types';

export const CLEAR = () => ({
  type: filterTypes.CLEAR,
  payload: '',
});

export const SET = (text) => ({
  type: filterTypes.SET,
  payload: text,
});
