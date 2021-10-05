import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const VALID_EMAIL = 'tryber@trybe.com';
const VALID_PASS = 'grupo24';
const EMAIL_INPUT_ID = 'email-input';
const PASSWORD_INPUT_ID = 'password-input';
const LOGIN_BUTTON_ID = 'login-submit-btn';
const TWELVE_CARDS = 12;

beforeEach(() => {
  renderWithRouter(<App />);
  userEvent.type(EMAIL_INPUT_ID, VALID_EMAIL);
  userEvent.type(PASSWORD_INPUT_ID, VALID_PASS);
  userEvent.click(LOGIN_BUTTON_ID);
});

describe('Elements with respecting the attributes', () => {
  it('The screen has the test data of all 12 food screen cards', async () => {
    for (i = 0; i < TWELVE_CARDS; i += 1) {
      const foodCard = screen.getByTestId(`${i}-recipe-card`);
      expect(foodCard).toBeInTheDocument();
    }
  });

  it('The screen has the test data of all 12 drink screen cards', () => {
    for (i = 0; i < TWELVE_CARDS; i += 1) {
      const drinkCard = screen.getByTestId(`${i}-recipe-card`);
      expect(drinkCard).toBeInTheDocument();
    }
  });
});
