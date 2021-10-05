import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ShareBtn from '../components/ShareBtn';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import { setLoading } from '../redux/actions/loading';
import Loading from '../components/Loading';

function RecipesDone() {
  const [recipes, setRecipes] = useState([]);
  const { loading } = useSelector((state) => state.reducerAPI);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const getData = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getData) {
      setRecipes(getData);
    }
    dispatch(setLoading(false));
  }, [dispatch]);

  function doneCard(card, index) {
    const {
      area = '',
      alcoholicOrNot = '',
      category = '',
      doneDate,
      image,
      name,
      tags,
      type,
      id,
    } = card;

    const types = type === 'comida' ? 'comida' : 'bebida';

    return (
      <div
        key={ index }
        className="done-recipe-card"
      >
        <div className="name-photo">
          <img
            src={ image }
            alt="recipe"
            data-testid={ `${index}-horizontal-image` }
            className="done-img"
          />
          <h4
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h4>
          <div>
            {alcoholicOrNot === ''
              ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${area} - ${category}` }
                </p>)
              : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { alcoholicOrNot }
                </p>)}
          </div>
        </div>
        <div className="done-details">
          <strong>Feita em:</strong>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            { doneDate }
          </p>
          {tags && <strong>Tags</strong>}
          { tags && (
            tags.map((item) => {
              const tagItem = (
                <p
                  key={ item }
                  data-testid={ `${index}-${item}-horizontal-tag` }
                >
                  { item }
                </p>
              );
              return tagItem;
            })) }
        </div>
        <ShareBtn
          testid={ `${index}-horizontal-share-btn` }
          id={ id }
          type={ types }
        />
      </div>
    );
  }

  return (
    <div>
      <HeaderWithoutSearch>Receitas Feitas</HeaderWithoutSearch>
      <div className="cat-btns">
        <Button
          variant="info"
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          variant="info"
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </Button>
        <Button
          variant="info"
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </Button>
      </div>

      <div>
        { loading
          ? <Loading />
          : recipes.map((recipe, index) => doneCard(recipe, index))}
      </div>
    </div>
  );
}

export default RecipesDone;
