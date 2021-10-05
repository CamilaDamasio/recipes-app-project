import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button } from 'react-bootstrap';
import { getMeal } from '../redux/actions';
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';
import useCategories from '../hooks/useCategories';
import { setLoading } from '../redux/actions/loading';
import useRedirect from '../hooks/useRedirect';
import LoadingSmall from '../components/LoadingSmall';

function MealsList() {
  const { reducerAPI: { loading, meals } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [renderedMeals, setRenderedMeals] = useState([]);
  const [selected, setSelected] = useState('all');
  const TWELVE = 12;
  const SELECTED_MEAL = 'cat selected-meal';
  const { shouldRedirect, redirect } = useRedirect();
  const { search, searchType } = useSelector((state) => state.reducerAPI);

  useEffect(() => {
    dispatch(getMeal(search, searchType));
  }, [dispatch, search, searchType]);

  useEffect(() => {
    if (meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (meals !== null && meals.length > 1) {
      const newMeals = [...meals.slice(0, TWELVE)];
      setRenderedMeals(newMeals);
    }
  }, [meals]);

  const [catList, setCatList] = useState([]);
  const CATURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const categories = useCategories(CATURL, 'meals');

  useEffect(() => {
    setCatList(categories);
  }, [categories]);

  if (meals !== null && meals.length === 1) {
    return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
  }

  const handleClickAll = () => {
    setSelected('all');
    const newMeals = [...meals.slice(0, TWELVE)];
    setRenderedMeals(newMeals);
  };

  const handleClick = async (target, name) => {
    dispatch(setLoading(true));
    if (target.className !== SELECTED_MEAL) {
      setSelected(name);
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
      const results = await fetch(url).then((response) => response.json());
      const firstTwelve = await results.meals.slice(0, TWELVE);
      setRenderedMeals(firstTwelve);
    } else {
      setSelected('all');
      handleClickAll();
    }
    dispatch(setLoading(false));
  };

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div>
      <HeaderWithSearch>
        Comidas
      </HeaderWithSearch>
      <div className="cat-btns">
        { catList.map(({ strCategory }) => (
          <Button
            variant="info"
            type="button"
            key={ v4() }
            onClick={ ({ target }) => handleClick(target, strCategory) }
            data-testid={ `${strCategory}-category-filter` }
            className={ selected === strCategory ? SELECTED_MEAL : 'cat not-selected' }
          >
            {strCategory}
          </Button>
        ))}
        <Button
          variant="info"
          type="button"
          onClick={ handleClickAll }
          data-testid="All-category-filter"
          className={ selected === 'all' ? SELECTED_MEAL : 'cat not-selected' }
        >
          All
        </Button>
      </div>
      <div className="cards-list">
        { loading ? <LoadingSmall /> : renderedMeals.map((item, index) => (
          <button
            type="button"
            onClick={ () => shouldRedirect(`/comidas/${item.idMeal}`) }
            key={ v4() }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <img
              alt="meal"
              src={ item.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
            <h4
              data-testid={ `${index}-card-name` }
              className="card-name"
            >
              {item.strMeal}
            </h4>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MealsList;
