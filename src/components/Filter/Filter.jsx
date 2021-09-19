import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledInput, StyledLabel } from './StyledFilterComponents';
import * as filterActions from '../../redux/filter/filter-actions';

const Filter = ({ onFilterChange, contacts: { items, filter } }) => {
  return (
    <div>
      <StyledLabel>
        Search
        <StyledInput
          type="text"
          name="search"
          placeholder="Please, type search name"
          value={filter}
          onChange={onFilterChange}
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

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: {
    items,
    filter,
  },
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange: (event) => dispatch(filterActions.SET(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
