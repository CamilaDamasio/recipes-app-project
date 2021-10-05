import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import loginSteps from './helpers/loginSteps';
import {
  buttonId,
  doneRecipesId,
  favoriteRecipesId,
  logoutButtonId,
  profileButtonId,
  profileEmailId,
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
  const profileButton = screen.getByTestId(profileButtonId);
  userEvent.click(profileButton);
  currentHistory = history;
});

describe('Tests profile route', () => {
  it('Route should be \'/perfil\'', () => {
    expect(currentHistory.location.pathname).toEqual('/perfil');
  });
});

describe('Tests correct rendering of email element', () => {
  it('Should render element with data-testid="profile-email"', () => {
    expect(screen.getByTestId(profileEmailId)).toBeInTheDocument();
  });

  it('Element should have email store in localStorage', () => {
    const profileEmail = screen.getByTestId(profileEmailId);
    const { email } = JSON.parse(localStorage.getItem('user'));
    expect(profileEmail).toHaveTextContent(email);
  });
});

describe('Tests correct rendering of done recipes button element', () => {
  it('Should render element with data-testid="profile-done-btn"', () => {
    expect(screen.getByTestId(doneRecipesId)).toBeInTheDocument();
  });

  it('Element should have text value "Receitas Feitas"', () => {
    expect(screen.getByRole('button', { name: 'Receitas Feitas' })).toBeInTheDocument();
  });
});

describe('Tests correct rendering of favorite recipes button', () => {
  it('Should render element with data-testid="profile-favorite-btn"', () => {
    expect(screen.getByTestId(favoriteRecipesId)).toBeInTheDocument();
  });

  it('Element should have text value "Receitas Favoritas"', () => {
    expect(screen.getByRole('button', { name: 'Receitas Favoritas' }))
      .toBeInTheDocument();
  });
});

describe('Tests correct rendering of logout button', () => {
  it('Should render element with data-testid="profile-logout-btn"', () => {
    expect(screen.getByTestId(logoutButtonId)).toBeInTheDocument();
  });

  it('Element should have text value "Sair"', () => {
    expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument();
  });
});

describe('Tests correct routing of done recipes button', () => {
  it('Should redirect to path \'/receitas-feitas\'', () => {
    const doneRecipes = screen.getByRole('button', { name: 'Receitas Feitas' });
    userEvent.click(doneRecipes);
    expect(currentHistory.location.pathname).toEqual('/receitas-feitas');
  });
});

describe('Tests correct routing of favorite recipes button', () => {
  it('Should redirect to path \'/receitas-favoritas\'', () => {
    const favoriteRecipes = screen.getByRole('button', { name: 'Receitas Favoritas' });
    userEvent.click(favoriteRecipes);
    expect(currentHistory.location.pathname).toEqual('/receitas-favoritas');
  });
});

describe('Tests correct routing of logout button and if clear localStorage', () => {
  beforeEach(() => {
    const logoutButton = screen.getByRole('button', { name: 'Sair' });
    userEvent.click(logoutButton);
  });

  it('Should redirect to path \'/\'', () => {
    expect(currentHistory.location.pathname).toEqual('/');
  });

  it('Should clear localStorage', () => {
    expect(localStorage.length).toEqual(0);
  });
});
