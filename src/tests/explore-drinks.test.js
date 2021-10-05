import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  buttonId,
  exploreButtonId,
  exploreByArea,
  exploreByIngredient,
  exploreSurprise,
  exploreDrinksId,
  VALID_EMAIL,
  VALID_PASSWORD,
} from './helpers/mocks';
import renderWithRouter from './helpers/renderWithRouter';
import loginSteps from './helpers/loginSteps';

let currentHistory;

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  loginSteps(VALID_EMAIL, VALID_PASSWORD);
  const loginButton = screen.getByTestId(buttonId);
  userEvent.click(loginButton);
  const exploreButton = screen.getByTestId(exploreButtonId);
  userEvent.click(exploreButton);
  userEvent.click(screen.getByTestId(exploreDrinksId));
  currentHistory = history;
});

describe('Tests rendering of explore drinks page', () => {
  it('Should render an element with text testid "explore-by-ingredient"', () => {
    const exploreByIngredientBtn = screen.getByTestId(exploreByIngredient);
    expect(exploreByIngredientBtn).toBeInTheDocument();
    expect(exploreByIngredientBtn).toHaveTextContent('Por Ingredientes');
  });

  it('Should render an element with testid "explore-by-area"', () => {
    const exploreByAreaBtn = screen.getByTestId(exploreByArea);
    expect(exploreByAreaBtn).toBeInTheDocument();
    expect(exploreByAreaBtn).toHaveTextContent('Por Local de Origem');
  });

  it('Should render an element with testid "explore-surprise"', () => {
    const exploreSurpriseBtn = screen.getByTestId(exploreSurprise);
    expect(exploreSurpriseBtn).toBeInTheDocument();
    expect(exploreSurpriseBtn).toHaveTextContent('Me Surpreenda!');
  });
});

describe('Tests routing of buttons on explore drinks page', () => {
  it('"Por Ingrediente" should redirect to "/explorar/bebidas/ingredientes"', () => {
    userEvent.click(screen.getByTestId(exploreByIngredient));
    expect(currentHistory.location.pathname).toEqual('/explorar/bebidas/ingredientes');
  });

  it('"Por Local de Origem" should redirect to /explorar/bebidas/area"', () => {
    userEvent.click(screen.getByTestId(exploreByArea));
    expect(currentHistory.location.pathname).toEqual('/explorar/bebidas/area');
  });
});
