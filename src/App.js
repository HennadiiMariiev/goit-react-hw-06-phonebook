import { useState, useEffect } from 'react';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { StyledApp, StyledBanner } from './components/AppComponents/AppComponents';
import { connect } from 'react-redux';
import * as itemsActions from './redux/items/items-actions';
import * as filterActions from './redux/filter/filter-actions';

import 'react-toastify/dist/ReactToastify.css';

function App({ contacts: { items, filter }, addMultiplyContacts }) {
  //#region class methods
  useEffect(() => {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsFromLocalStorage) {
      addMultiplyContacts(contactsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(items));
  }, [items]);

  //#endregion

  return (
    <StyledApp>
      <Form />
      <Filter value={filter} disabled={items.length ? false : true} />

      {items.length === 0 ? <StyledBanner>No contacts...</StyledBanner> : <Contacts />}
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
    // addNewContact: (contact) => dispatch(itemsActions.ADD(contact)),
    addMultiplyContacts: (contactsList) => dispatch(itemsActions.ADD_MUTIPLY_CONTACTS(contactsList)),
    // removeSingleContact: (contact) => dispatch(itemsActions.REMOVE(contact)),
    // removeAllContacts: () => dispatch(itemsActions.REMOVE_ALL()),
    clearFilter: () => dispatch(filterActions.CLEAR()),
    setFilter: (text) => dispatch(filterActions.SET(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
