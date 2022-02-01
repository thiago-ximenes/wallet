import React from 'react';
import PropTypes from 'prop-types';

function Input({ name, type, value, onChange, placeholder }) {
  return (
    <input
      className="rounded-md px-4 py-2 text-base mr-2 mb-2
      outline-none focus:border-b-4 focus:border-b-amber-500"
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
};

export default Input;
