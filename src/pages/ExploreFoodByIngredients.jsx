import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import useIngredients from '../hooks/useIngredients';
import { switchSearch } from '../redux/actions';
import useRedirect from '../hooks/useRedirect';
import Loading from '../components/Loading';

function ExploreFoodByIngredients() {
  const ingredients = useIngredients('meal');
  const { loading } = useSelector((state) => state.reducerAPI);
  const dispatch = useDispatch();
  const { shouldRedirect, redirect } = useRedirect();

  if (loading) return <Loading />;

  const handleClick = (ingredient) => {
    dispatch(switchSearch(ingredient, 'Ingrediente'));
    shouldRedirect('/comidas');
  };

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div className="ingredients-list">
      <HeaderWithoutSearch>Explorar Ingredientes</HeaderWithoutSearch>
      {ingredients.map(({ strIngredient }, i) => (
        <button
          type="button"
          key={ strIngredient }
          className="ingredient-card"
          data-testid={ `${i}-ingredient-card` }
          onClick={ () => handleClick(strIngredient) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ `${strIngredient} thumbnail` }
            data-testid={ `${i}-card-img` }
          />
          <h4 data-testid={ `${i}-card-name` }>{strIngredient}</h4>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;
