import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import {
  StyledForm,
  StyledTitle,
  StyledLable,
  StyledInput,
  StyledButton as StyledPrimaryButton,
} from "./StyledFormComponents";
import { connect } from "react-redux";
import { ADD } from "../../redux/items/items-actions";
import { toastMessage } from "./form-helper";
import { useSelector } from "react-redux";
import { getItems } from "../../redux/items/items-selectors";
import { useDispatch } from "react-redux";

const useInput = (input) => {
  const [value, setValue] = useState(() => "");

  useEffect(() => {
    function isValidInput(input) {
      if (!input.value.match(input.pattern) && input.value.length) return false;

      return true;
    }

    if (!isValidInput(input.current)) {
      input.current.style = "background-color: #f7d7d7;";
    } else {
      input.current.style = "background-color: transparent;";
    }
  }, [value, input]);

  return [value, setValue];
};

function Form() {
  const items = useSelector(getItems);
  const dispatch = useDispatch();

  const nameInput = useRef();
  const numberInput = useRef();

  const [name, setName] = useInput(nameInput);
  const [number, setNumber] = useInput(numberInput);

  //#region methods
  const onInputChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;

      case "number":
        setNumber(event.target.value);
        break;

      default:
        return;
    }
  };

  const clearInputs = () => {
    setName("");
    setNumber("");
  };

  const isNameInContacts = (searchName) =>
    items.find(({ name }) => name === searchName);

  const submitNewContact = (event) => {
    event.preventDefault();

    if (isNameInContacts(name)) {
      toastMessage("warn", `There is an existing contact with name "${name}"!`);
      return;
    }

    dispatch(ADD(name, number));

    toastMessage("success", `New contact "${name}" was added!`);

    clearInputs();
  };
  //#endregion

  return (
    <>
      <StyledTitle>Phonebook</StyledTitle>
      <StyledForm onSubmit={submitNewContact}>
        <StyledLable>
          Name
          <StyledInput
            type="text"
            name="name"
            pattern="^[a-zA-Z??-????-??]+(([' -][a-zA-Z??-????-?? ])?[a-zA-Z??-????-??]*)*$"
            title="?????? ?????????? ???????????????? ???????????? ???? ????????, ??????????????????, ???????? ?? ????????????????. ???????????????? Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan ?? ??. ??."
            placeholder="Please, type contact name"
            required
            value={name}
            ref={nameInput}
            onChange={onInputChange}
          />
        </StyledLable>
        <StyledLable>
          Number
          <StyledInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="?????????? ???????????????? ???????????? ???????????????? ???????? ?? ?????????? ?????????????????? ??????????????, ????????, ?????????????? ???????????? ?? ?????????? ???????????????????? ?? +"
            placeholder="Please, type contact number"
            required
            value={number}
            ref={numberInput}
            onChange={onInputChange}
          />
        </StyledLable>
        <StyledPrimaryButton type="submit">Add contact</StyledPrimaryButton>
      </StyledForm>
    </>
  );
}

Form.propTypes = {
  onNewContactAdd: PropTypes.func,
};

// const mapStateToProps = ({ contacts: { items, filter } }) => ({
//   contacts: {
//     items,
//     filter,
//   },
// });

// const mapDispatchToProps = (dispatch) => ({
//   onNewContactAdd: (name, number) => dispatch(ADD(name, number)),
// });

export default connect()(Form);
