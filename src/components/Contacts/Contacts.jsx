import PropTypes from "prop-types";

import {
  StyledItem,
  StyledName,
  StyledNumber,
  StyledDiv,
  StyledList,
  StyledSubTitle,
  StyledButton,
} from "./StyledContactsComponents";

import { StyledBanner } from "../AppComponents/AppComponents";

import { StyledButton as StyledPrimaryButton } from "../Form/StyledFormComponents";
import { connect } from "react-redux";
import { REMOVE, REMOVE_ALL } from "../../redux/items/items-actions";
import { useSelector } from "react-redux";
import { getFilter, getItems } from "../../redux/items/items-selectors";
import { useDispatch } from "react-redux";

const applyFilter = (items, filter) => {
  if (filter === "") {
    return items;
  }

  const searchStr = filter.toLowerCase();
  const filteredContacts = items.filter((contact) =>
    contact.name.toLowerCase().includes(searchStr)
  );
  return filteredContacts;
};

const Contacts = () => {
  const items = useSelector(getItems);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const makeContactsList = applyFilter(items, filter).map(
    ({ name, number, id }) => {
      return (
        <StyledItem key={id}>
          <StyledName>{name}</StyledName>
          <StyledNumber>{number}</StyledNumber>
          <StyledButton
            onClick={(event) => dispatch(REMOVE(event.target.value))}
            value={id}
          >
            Remove
          </StyledButton>
        </StyledItem>
      );
    }
  );

  return (
    <StyledDiv>
      {items.length === 0 ? (
        <StyledBanner>No contacts...</StyledBanner>
      ) : (
        <>
          <StyledSubTitle>Contacts</StyledSubTitle>
          <StyledList>{makeContactsList}</StyledList>
          <StyledPrimaryButton
            onClick={() => dispatch(REMOVE_ALL())}
            style={{ backgroundColor: "#FAFAFA" }}
          >
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

// const mapStateToProps = ({ contacts: { items, filter } }) => ({
//   contacts: {
//     items: applyFilter(items, filter),
//     filter,
//   },
// });

// const mapDispatchToProps = (dispatch) => ({
//   removeSingleContact: (event) => dispatch(REMOVE(event.target.value)),
//   removeAllContacts: () => dispatch(REMOVE_ALL()),
// });

export default connect()(Contacts);
