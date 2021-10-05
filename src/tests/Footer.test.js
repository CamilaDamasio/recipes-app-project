import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('<Footer />', () => {
  it('should mount', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('if has drink button', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const drinkBttn = screen.getByTestId('drinks-bottom-btn');

    expect(drinkBttn).toBeInTheDocument();
  });

  it('if has explore button', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const exploreBttn = screen.getByTestId('explore-bottom-btn');

    expect(exploreBttn).toBeInTheDocument();
  });

  it('if has food button', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const foodBttn = screen.getByTestId('food-bottom-btn');

    expect(foodBttn).toBeInTheDocument();
  });
});
