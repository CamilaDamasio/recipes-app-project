import React from 'react';
import PropTypes from 'prop-types';
import Input from '../DefaultComponents/Input';

function InputSearch(props) {
  const { handleChange, value } = props;

  return (
    <Input
      handleChange={ handleChange }
      label="Busca"
      name="search"
      testId="search-input"
      type="text"
      value={ value }
    />
  );
}

const { func, string, number, oneOfType } = PropTypes;
InputSearch.propTypes = {
  handleChange: func.isRequired,
  value: oneOfType([string, number]).isRequired,
};

export default InputSearch;
