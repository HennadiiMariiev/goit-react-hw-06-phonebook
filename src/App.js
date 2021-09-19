import { useEffect } from 'react';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import { ToastContainer } from 'react-toastify';

import { StyledApp } from './components/AppComponents/AppComponents';
import { connect } from 'react-redux';
import * as itemsActions from './redux/items/items-actions';

import 'react-toastify/dist/ReactToastify.css';

function App({ contacts: { items, filter }, addMultiplyContacts }) {
  //#region methods
  useEffect(() => {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsFromLocalStorage) {
      addMultiplyContacts(contactsFromLocalStorage);
    }
  }, [addMultiplyContacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(items));
  }, [items]);

  //#endregion

  return (
    <StyledApp>
      <Form />
      <Filter value={filter} disabled={items.length ? false : true} />
      <Contacts />
      <ToastContainer />
    </StyledApp>
  );
}

const mapStateToProps = (state) => ({
  contacts: {
    items: state.contacts.items,
    filter: state.contacts.filter,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addMultiplyContacts: (contactsList) => dispatch(itemsActions.ADD_MUTIPLY_CONTACTS(contactsList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
