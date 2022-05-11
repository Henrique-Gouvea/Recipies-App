import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Explore from '../pages/Explore';

const exploreFoods = 'explore-foods';
const exploreDrinks = 'explore-drinks';

describe('Explore tests', () => {
  afterEach(cleanup);

  it('Check screen elements', async () => {
    const { history } = renderWithContext(<Explore />);
    const foodsBtn = await screen.findByTestId(exploreFoods);
    const drinksBtn = await screen.findByTestId(exploreDrinks);

    expect(foodsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    expect(foodsBtn).toHaveValue('Explore Foods');
    fireEvent.click(foodsBtn);
    expect(history.location.pathname).toBe('/explore/foods');

    expect(drinksBtn).toHaveValue('Explore Drinks');
    fireEvent.click(drinksBtn);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
