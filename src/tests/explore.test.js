import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import loginSteps from './helpers/loginSteps';
import {
  buttonId,
  exploreButtonId,
  exploreDrinksId,
  exploreFoodId,
  VALID_EMAIL,
  VALID_PASSWORD,
} from './helpers/mocks';
import renderWithRouter from './helpers/renderWithRouter';

let currentHistory;
beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  loginSteps(VALID_EMAIL, VALID_PASSWORD);
  const loginButton = screen.getByTestId(buttonId);
  userEvent.click(loginButton);
  const exploreButton = screen.getByTestId(exploreButtonId);
  userEvent.click(exploreButton);
  currentHistory = history;
});

describe('Tests explore screen route', () => {
  it('Route should be \'/explorar\'', () => {
    expect(currentHistory.location.pathname).toEqual('/explorar');
  });
});

describe('Tests if renders both buttons', () => {
  it('Should render button with text "Explorar Comidas" & testid="explore-food"', () => {
    const exploreFood = screen.getByTestId(exploreFoodId);
    expect(exploreFood).toBeInTheDocument();
    expect(exploreFood).toHaveTextContent('Explorar Comidas');
  });

  it('Should render button with text "Explorar Bebidas & testid="explore-drinks', () => {
    const exploreDrinks = screen.getByTestId(exploreDrinksId);
    expect(exploreDrinks).toBeInTheDocument();
    expect(exploreDrinks).toHaveTextContent('Explorar Bebidas');
  });
});

describe('Tests buttons routing', () => {
  it('Should redirect to "/explorar/comidas" after button Explorar Comidas click', () => {
    const exploreFoodBtn = screen.getByTestId(exploreFoodId);
    userEvent.click(exploreFoodBtn);

    expect(currentHistory.location.pathname).toEqual('/explorar/comidas');
  });

  it('Should redirect to "/explorar/bebidas" after button Explorar Bebidas click', () => {
    const exploreDrinksBtn = screen.getByTestId(exploreDrinksId);
    userEvent.click(exploreDrinksBtn);

    expect(currentHistory.location.pathname).toEqual('/explorar/bebidas');
  });
});
