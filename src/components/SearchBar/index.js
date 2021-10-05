import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import ButtonSearch from './ButtonSearch';
import InputSearch from './InputSearch';
import RadiosButtonSearch from './RadiosButtonSearch';
import { getCocktail, getMeal } from '../../redux/actions';

const INITIAL_STATE = {
  search: '',
  typeSearch: 'Nome',
};

function SearchBar() {
  const [stateSearchBar, setStateSearchBar] = useState(INITIAL_STATE);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { search, typeSearch } = stateSearchBar;

  useEffect(() => {
    if (typeSearch === 'Primeira letra' && search.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }, [search.length, typeSearch]);

  const handleChange = ({ target: { name, type, value, checked } }) => {
    function newValue() {
      switch (type) {
      case 'checkbox': return checked;
      case 'number': return +value;
      default: return value;
      }
    }
    setStateSearchBar({ ...stateSearchBar, [name]: newValue() });
  };

  const handleClick = () => {
    if (pathname.includes('bebidas')) {
      dispatch(getCocktail(search, typeSearch));
    } else {
      dispatch(getMeal(search, typeSearch));
    }
  };

  return (
    <form className="search-form">
      <InputSearch
        handleChange={ handleChange }
        value={ search }
      />
      <div className="radios">
        <RadiosButtonSearch
          handleChange={ handleChange }
          value={ typeSearch }
        />
      </div>
      <ButtonSearch
        handleClick={ handleClick }

      />
    </form>
  );
}

export default SearchBar;
