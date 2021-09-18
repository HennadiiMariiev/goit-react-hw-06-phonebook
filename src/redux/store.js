import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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

const store = createStore(rootReducer, composeWithDevTools());

export { initialState, store };
