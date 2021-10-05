import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('search bar test', () => {
  const searchTopButtonId = 'search-top-btn';
  const execSearchButtonId = 'exec-search-btn';
  const searchInputId = 'search-input';
  const ingredientSearchRadioId = 'ingredient-search-radio';
  const nameSearchRadioId = 'name-search-radio';
  const firstLetterSearchRadioId = 'first-letter-search-radio';

  describe('test search bar on MealsList page', () => {
    it('tests whether the input, button and radio buttons'
    + ' components are rendered on the MealsList page', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/comidas');

      const searchTopButton = screen.getByTestId(searchTopButtonId);
      userEvent.click(searchTopButton);

      const nameInput = screen.getByTestId(searchInputId);
      expect(nameInput).toBeDefined();

      const searchButton = screen.getByTestId(execSearchButtonId);
      expect(searchButton).toBeDefined();

      const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioId);
      expect(ingredientSearchRadio).toBeDefined();

      const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
      expect(nameSearchRadio).toBeDefined();

      const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioId);
      expect(firstLetterSearchRadio).toBeDefined();
    });
  });

  describe('test search bar on DrinksList page', () => {
    it('tests whether the input, button and radio buttons'
  + ' components are rendered on the DrinksList page', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/bebidas');

      const searchTopButton = screen.getByTestId(searchTopButtonId);

      userEvent.click(searchTopButton);

      const nameInput = screen.getByTestId(searchInputId);
      expect(nameInput).toBeDefined();

      const searchButton = screen.getByTestId(execSearchButtonId);
      expect(searchButton).toBeDefined();

      const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioId);
      expect(ingredientSearchRadio).toBeDefined();

      const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
      expect(nameSearchRadio).toBeDefined();

      const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioId);
      expect(firstLetterSearchRadio).toBeDefined();
    });
  });

  describe('test alert message', () => {
    it('tests if renders alert "Sua busca deve conter somente'
    + ' 1 (um) caracter" when typing more than one character', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/comidas');

      const searchTopButton = screen.getByTestId(searchTopButtonId);
      userEvent.click(searchTopButton);

      const MESSAGE = 'Sua busca deve conter somente 1 (um) caracter';

      const nameInput = screen.getByTestId(searchInputId);
      userEvent.type(nameInput, MESSAGE);
    });
  });
});
