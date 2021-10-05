import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Loading from '../components/Loading';
import useIngredients from '../hooks/useIngredients';
import useRedirect from '../hooks/useRedirect';
import { switchSearch } from '../redux/actions';

function ExploreDrinksByIngredients() {
  const ingredients = useIngredients('cocktail');

  const { loading } = useSelector((state) => state.reducerAPI);
  const dispatch = useDispatch();

  const { shouldRedirect, redirect } = useRedirect();

  if (loading) return <Loading />;

  const handleClick = (ingredient) => {
    dispatch(switchSearch(ingredient, 'Ingrediente'));
    shouldRedirect('/bebidas');
  };

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div className="ingredients-list">
      <HeaderWithoutSearch>Explorar Ingredientes</HeaderWithoutSearch>
      {ingredients.map(({ strIngredient1 }, i) => {
        const thumbURL = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
        return (
          <button
            type="button"
            key={ strIngredient1 }
            className="ingredient-card"
            data-testid={ `${i}-ingredient-card` }
            onClick={ () => handleClick(strIngredient1) }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ thumbURL }
              alt={ `${strIngredient1} thumbnail` }
            />
            <h4 data-testid={ `${i}-card-name` }>{strIngredient1}</h4>
          </button>
        );
      })}
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
