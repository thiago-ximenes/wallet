import React from 'react';
import PropTypes from 'prop-types';

function Select({ id, value, name, onChange, options, ariaLabel }) {
  return (
    <label htmlFor={ id } aria-label={ ariaLabel }>
      <select
        id={ id }
        value={ value }
        name={ name }
        onChange={ (e) => onChange(e) }
        className="py-2 px-4 rounded-md bg-white form-select block
         border shadow-sm focus:outline-none focus:ring-2
        focus:ring-amber-500 mr-2 mb-2"
      >
        { options.map((option) => (
          <option
            key={ option }
            value={ option }
          >
            { option }
          </option>
        )) }
      </select>
    </label>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default Select;
