import PropTypes from 'prop-types';

import {
  StyledItem,
  StyledName,
  StyledNumber,
  StyledDiv,
  StyledList,
  StyledSubTitle,
  StyledButton,
} from './StyledContactsComponents';

import { StyledBanner } from '../AppComponents/AppComponents';

import { StyledButton as StyledPrimaryButton } from '../Form/StyledFormComponents';
import { connect } from 'react-redux';
import * as itemsActions from '../../redux/items/items-actions';
import { useEffect, useState } from 'react';

const Contacts = ({ contacts: { items, filter }, removeSingleContact, removeAllContacts }) => {
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    setFilteredContacts(() => {
      if (filter === '') {
        return makeContactsList(items);
      }

      const searchStr = filter.toLowerCase();
      const filteredContacts = items.filter((contact) => contact.name.toLowerCase().includes(searchStr));

      return makeContactsList(filteredContacts);
    });
  }, [filter, items]);

  const makeContactsList = (contacts) => {
    return contacts.map(({ name, number, id }) => {
      return (
        <StyledItem key={id}>
          <StyledName>{name}</StyledName>
          <StyledNumber>{number}</StyledNumber>

          <StyledButton onClick={removeSingleContact} value={id}>
            Remove
          </StyledButton>
        </StyledItem>
      );
    });
  };

  return (
    <StyledDiv>
      {filteredContacts.length === 0 ? (
        <StyledBanner>No contacts...</StyledBanner>
      ) : (
        <>
          <StyledSubTitle>Contacts</StyledSubTitle>
          <StyledList>{filteredContacts}</StyledList>
          <StyledPrimaryButton onClick={removeAllContacts} style={{ backgroundColor: '#FAFAFA' }}>
            Remove all
          </StyledPrimaryButton>
        </>
      )}
    </StyledDiv>
  );
};

Contacts.propTypes = {
  deleteContact: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

const mapStateToProps = (state) => ({
  contacts: {
    items: state.contacts.items,
    filter: state.contacts.filter,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeSingleContact: (event) => dispatch(itemsActions.REMOVE(event.target.value)),
    removeAllContacts: () => dispatch(itemsActions.REMOVE_ALL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
