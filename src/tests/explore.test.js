import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const exploreFoods = 'explore-foods';
const exploreDrinks = 'explore-drinks';

describe('Explore tests', () => {
  afterEach(cleanup);

  it('Check foods elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore');
    const foodsBtn = await screen.findByTestId(exploreFoods);

    expect(foodsBtn).toBeInTheDocument();

    expect(foodsBtn).toHaveValue('Explore Foods');
    fireEvent.click(foodsBtn);
    expect(history.location.pathname).toBe('/explore/foods');
  });

  it('Check drinks elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore');
    const drinksBtn = await screen.findByTestId(exploreDrinks);

    expect(drinksBtn).toBeInTheDocument();

    expect(drinksBtn).toHaveValue('Explore Drinks');
    fireEvent.click(drinksBtn);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
