import PropTypes from 'prop-types';
import React from 'react';

function Input({ name, type, value, onChange, placeholder }) {
  return (
    <input
      className="appearance-none rounded-md px-4 py-2 text-base mr-2 mb-2
      outline-none focus:border-2 focus:border-amber-500
      border-b-2 border-gray-300"
      name={ name }
      value={ value }
      type={ type }
      onChange={ (e) => onChange(e) }
      placeholder={ placeholder }
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
