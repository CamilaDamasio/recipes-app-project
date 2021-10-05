import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import useRedirect from '../hooks/useRedirect';

function Explore() {
  const { shouldRedirect, redirect } = useRedirect();

  if (redirect.should) return <Redirect to={ redirect.path } />;
  return (
    <div className="explore">
      <HeaderWithoutSearch>Explorar</HeaderWithoutSearch>
      <div className="explore-btns">
        <Button
          variant="danger"
          data-testid="explore-food"
          onClick={ () => shouldRedirect('/explorar/comidas') }
        >
          Explorar Comidas
        </Button>
        <Button
          variant="primary"
          data-testid="explore-drinks"
          onClick={ () => shouldRedirect('/explorar/bebidas') }
        >
          Explorar Bebidas
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
