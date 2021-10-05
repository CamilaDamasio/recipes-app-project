import React from 'react';
import PropTypes from 'prop-types';
import RadiosButton from '../DefaultComponents/RadiosButton';

function RadiosButtonSearch(props) {
  const { handleChange, value } = props;

  const radios = [
    { textId: 'ingredient-search-radio', valueRadio: 'Ingrediente' },
    { textId: 'name-search-radio', valueRadio: 'Nome' },
    { textId: 'first-letter-search-radio', valueRadio: 'Primeira letra' },
  ];

  return (
    <RadiosButton
      handleChange={ handleChange }
      radios={ radios }
      value={ value }
      name="typeSearch"
    />
  );
}

const { func, string } = PropTypes;
RadiosButtonSearch.propTypes = {
  handleChange: func.isRequired,
  value: string.isRequired,
};

export default RadiosButtonSearch;
