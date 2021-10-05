import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button } from 'react-bootstrap';
import { getCocktail } from '../redux/actions';
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';
import useCategories from '../hooks/useCategories';
import { setLoading } from '../redux/actions/loading';
import useRedirect from '../hooks/useRedirect';
import LoadingSmall from '../components/LoadingSmall';

function DrinksList() {
  const { reducerAPI: { loading, cocktails } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [renderedCocktails, setRenderedCocktails] = useState([]);
  const [selected, setSelected] = useState('all');
  const TWELVE = 12;
  const SELECTED_DRINK = 'cat selected-drink';
  const { shouldRedirect, redirect } = useRedirect();
  const { search, searchType } = useSelector((state) => state.reducerAPI);

  useEffect(() => {
    dispatch(getCocktail(search, searchType));
  }, [dispatch, searchType, search]);

  useEffect(() => {
    if (cocktails === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (cocktails !== null && cocktails.length > 1) {
      const newDrinks = [...cocktails.slice(0, TWELVE)];
      setRenderedCocktails(newDrinks);
    }
  }, [cocktails]);

  const [catList, setCatList] = useState([]);
  const CATURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const categories = useCategories(CATURL, 'drinks');

  useEffect(() => {
    setCatList(categories);
  }, [categories]);

  if (cocktails !== null && cocktails.length === 1) {
    return <Redirect to={ `/bebidas/${cocktails[0].idDrink}` } />;
  }

  const handleClickAll = async () => {
    setSelected('all');
    const newCocktails = [...cocktails.slice(0, TWELVE)];
    setRenderedCocktails(newCocktails);
  };

  const handleClick = async (target, name) => {
    dispatch(setLoading(true));
    if (target.className !== SELECTED_DRINK) {
      setSelected(name);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
      const results = await fetch(url).then((response) => response.json());
      const firstTwelve = await results.drinks.slice(0, TWELVE);
      setRenderedCocktails(firstTwelve);
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
        Bebidas
      </HeaderWithSearch>
      <div className="cat-btns">
        { catList.map(({ strCategory }) => (
          <Button
            variant="warning"
            type="button"
            key={ v4() }
            onClick={ ({ target }) => handleClick(target, strCategory) }
            data-testid={ `${strCategory}-category-filter` }
            className={ selected === strCategory ? SELECTED_DRINK : 'cat not-selected' }
          >
            {strCategory}
          </Button>
        ))}
        <Button
          variant="warning"
          type="button"
          onClick={ handleClickAll }
          data-testid="All-category-filter"
          className={ selected === 'all' ? SELECTED_DRINK : 'cat not-selected' }
        >
          All
        </Button>
      </div>
      <div className="cards-list">
        { loading ? <LoadingSmall /> : renderedCocktails.map((item, index) => (
          <button
            type="button"
            onClick={ () => shouldRedirect(`/bebidas/${item.idDrink}`) }
            key={ v4() }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <img
              alt="drink"
              src={ item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <h4
              data-testid={ `${index}-card-name` }
              className="card-name"
            >
              {item.strDrink}
            </h4>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DrinksList;
