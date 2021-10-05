import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import useRedirect from '../hooks/useRedirect';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import useRandom from '../hooks/useRandom';

function ExploreDrinks() {
  const { shouldRedirect, redirect } = useRedirect();
  const [random, error] = useRandom('drink');

  const randomDrink = () => {
    if (!error) {
      shouldRedirect(`/bebidas/${random.idDrink}`);
    }
  };

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div className="explore">
      <HeaderWithoutSearch>Explorar Bebidas</HeaderWithoutSearch>
      <div className="explore-btns">

        <Button
          variant="success"
          data-testid="explore-by-ingredient"
          onClick={ () => shouldRedirect('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </Button>
        <Button
          variant="warning"
          data-testid="explore-surprise"
          onClick={ randomDrink }
        >
          Me Surpreenda!
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
