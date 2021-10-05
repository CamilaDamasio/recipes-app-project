import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { getMeal } from '../redux/actions';
import useRedirect from '../hooks/useRedirect';
import Loading from '../components/Loading';

function FoodByOrigin() {
  const [originsListFilter, setOriginsListFilter] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [firstTwelve, setFistTwelve] = useState([]);
  const [originSelect, setOriginSelect] = useState({ selected: 'All' });
  const { shouldRedirect, redirect } = useRedirect();
  const TWELVE = 12;

  const { selected } = originSelect;

  const dispatch = useDispatch();
  const { reducerAPI: { loading, meals } } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  useEffect(() => {
    const fetchFilterOrigins = async () => {
      if (selected !== 'All') {
        const END_POINT = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selected}`;

        const response = await fetch(END_POINT);
        const { meals: filterOriginsList } = await response.json();
        return setOriginsListFilter(filterOriginsList);
      }
    };
    fetchFilterOrigins();
  }, [selected]);

  useEffect(() => {
    const fetchOrigins = async () => {
      const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

      const response = await fetch(END_POINT);
      const { meals: originsList } = await response.json();
      const originsMap = originsList.map(({ strArea }) => strArea);
      const results = ['All', ...originsMap];
      return setOrigins(results);
    };
    fetchOrigins();
  }, [origins]);

  useEffect(() => {
    if (selected === 'All') {
      setFistTwelve(meals.slice(0, TWELVE));
    } else {
      setFistTwelve(originsListFilter.slice(0, TWELVE));
    }
  }, [originsListFilter, meals, selected]);

  const handleChange = ({ target: { name, type, value, checked } }) => {
    function newValue() {
      switch (type) {
      case 'checkbox': return checked;
      case 'number': return +value;
      default: return value;
      }
    }
    setOriginSelect({ ...originSelect, [name]: newValue() });
  };

  if (loading) {
    return <Loading />;
  }

  if (redirect.should) {
    return <Redirect to={ redirect.path } />;
  }
  return (
    <div className="explore">
      <HeaderWithSearch>Explorar Origem</HeaderWithSearch>
      <label htmlFor="selected" className="origin-select">
        Origin
        <select
          data-testid="explore-by-area-dropdown"
          id="selected"
          name="selected"
          onChange={ handleChange }
          value={ selected }
        >
          { origins.map((option) => (
            <option
              data-testid={ `${option}-option` }
              key={ option }
              value={ option }
            >
              { option }
            </option>
          )) }
        </select>
      </label>
      <div className="ingredients-list">
        {
          firstTwelve.map(({ idMeal, strMealThumb, strMeal }, index) => (
            <button
              type="button"
              onClick={ () => shouldRedirect(`/comidas/${idMeal}`) }
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
            >
              <img
                alt="meal"
                src={ strMealThumb }
                data-testid={ `${index}-card-img` }
              />
              <h4 data-testid={ `${index}-card-name` }>{strMeal}</h4>
            </button>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default FoodByOrigin;
