import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyledInput, StyledLabel } from "./StyledFilterComponents";
import { setFilter } from "../../redux/filter/filter-actions";
import { getFilter, getItems } from "../../redux/items/items-selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Filter = () => {
  const filter = useSelector(getFilter);
  const items = useSelector(getItems);

  const dispatch = useDispatch();

  return (
    <div>
      <StyledLabel>
        Search
        <StyledInput
          type="text"
          name="search"
          placeholder="Please, type search name"
          value={filter}
          onChange={(event) => dispatch(setFilter(event.target.value))}
          disabled={items.length ? false : true}
        />
      </StyledLabel>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};

// const mapStateToProps = ({ contacts: { items, filter } }) => ({
//   contacts: {
//     items,
//     filter,
//   },
// });

// const mapDispatchToProps = (dispatch) => ({
//   onFilterChange: (event) => dispatch(event.target.value),
// });

export default connect()(Filter);
