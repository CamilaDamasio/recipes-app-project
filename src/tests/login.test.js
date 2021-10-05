import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import {
  emailInputId,
  passwordInputId,
  buttonId,
  VALID_EMAIL,
  VALID_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
} from './helpers/mocks';
import loginSteps from './helpers/loginSteps';

describe('Test Login route', () => {
  it('Route should be \'/\'', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    expect(pathname).toEqual('/');
  });
});

describe('Test Login screen rendering', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Renders input for email', () => {
    expect(screen.getByTestId(emailInputId)).toBeInTheDocument();
  });

  it('Renders input for password', () => {
    expect(screen.getByTestId(passwordInputId)).toBeInTheDocument();
  });

  it('Renders Login button', () => {
    expect(screen.getByTestId(buttonId)).toBeInTheDocument();
  });
});

describe('Test Login inputs', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Can type e-mail', () => {
    const emailInput = screen.getByTestId(emailInputId);
    userEvent.type(emailInput, 'email@email.com');
    expect(emailInput.value).toEqual('email@email.com');
  });

  it('Can type password', async () => {
    const passwordInput = screen.getByTestId(passwordInputId);
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput.value).toEqual('1234567');
  });
});

describe('Tests Login validation', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Button remains disabled with invalid data on both inputs', () => {
    loginSteps(INVALID_EMAIL, INVALID_PASSWORD);
    const loginButton = screen.getByTestId(buttonId);
    expect(loginButton).toBeDisabled();
  });

  it('Button remains disabled with invalid email, but valid password inputs', () => {
    loginSteps(INVALID_EMAIL, VALID_PASSWORD);
    const loginButton = screen.getByTestId(buttonId);

    expect(loginButton).toBeDisabled();
  });

  it('Button remains disabled with valid email, but invalid password inputs', () => {
    loginSteps(VALID_EMAIL, INVALID_PASSWORD);
    const loginButton = screen.getByTestId(buttonId);
    expect(loginButton).toBeDisabled();
  });

  it('Button enables with both valid inputs', () => {
    loginSteps(VALID_EMAIL, VALID_PASSWORD);
    const loginButton = screen.getByTestId(buttonId);
    expect(loginButton).not.toBeDisabled();
  });
});

describe('Tests Login submit', () => {
  it('Should save email under \'user\' key in localStorage ', () => {
    renderWithRouter(<App />);
    loginSteps(VALID_EMAIL, VALID_PASSWORD);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.click(loginButton);

    const { email } = JSON.parse(localStorage.getItem('user'));
    expect(email).toEqual(VALID_EMAIL);
  });

  it('Should save tokens in localStorage with values equal to 1', () => {
    renderWithRouter(<App />);
    loginSteps(VALID_EMAIL, VALID_PASSWORD);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.click(loginButton);

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));
    expect(mealsToken).toEqual(1);
    expect(cocktailsToken).toEqual(1);
  });

  it('Should redirect user to path \'/comidas\'', () => {
    const { history } = renderWithRouter(<App />);
    loginSteps(VALID_EMAIL, VALID_PASSWORD);
    const loginButton = screen.getByTestId(buttonId);
    userEvent.click(loginButton);

    expect(history.location.pathname).toEqual('/comidas');
  });
});
