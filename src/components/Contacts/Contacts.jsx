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

import { StyledButton as StyledPrimaryButton } from '../Form/StyledFormComponents';
import { connect } from 'react-redux';
import * as itemsActions from '../../redux/items/items-actions';

const Contacts = ({ contacts: { items }, removeSingleContact, removeAllContacts }) => {
  const contactsItems = items.map(({ name, number, id }) => {
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

  return (
    <StyledDiv>
      <StyledSubTitle>Contacts</StyledSubTitle>
      <StyledList>{contactsItems}</StyledList>
      <StyledPrimaryButton onClick={removeAllContacts} style={{ backgroundColor: '#FAFAFA' }}>
        Remove all
      </StyledPrimaryButton>
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
