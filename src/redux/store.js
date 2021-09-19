import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filter/filter-reducer';
import { itemsReducer } from './items/items-reducer';

const initialState = {
  contacts: {
    items: [],
    filter: '',
  },
};

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { initialState, store };
