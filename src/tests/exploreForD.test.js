import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import ExploreFoods from '../pages/explore/ExploreFoods';
import ExploreDrinks from '../pages/explore/ExploreDrinks';

const INGREDIENT = 'explore-by-ingredient';
const NATIONALITY = 'explore-by-nationality';
const SURPRISE = 'explore-surprise';

describe('Header tests', () => {
  afterEach(cleanup);

  it('Check explore foods screen elements', async () => {
    const { history } = renderWithContext(<ExploreFoods />);

    const ingredientBtn = await screen.findByTestId(INGREDIENT);
    const nationalityBtn = await screen.findByTestId(NATIONALITY);
    const surpriseBtn = await screen.findByTestId(SURPRISE);

    expect(ingredientBtn).toBeInTheDocument();
    expect(nationalityBtn).toBeInTheDocument();
    expect(surpriseBtn).toBeInTheDocument();

    expect(ingredientBtn.innerHTML).toBe('By Ingredient');
    expect(nationalityBtn.innerHTML).toBe('By Nationality');
    expect(surpriseBtn.innerHTML).toBe('Surprise me!');

    fireEvent.click(ingredientBtn);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');

    fireEvent.click(nationalityBtn);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  it('Check explore drinks screen elements', async () => {
    const { history } = renderWithContext(<ExploreDrinks />);

    const ingredientBtn = await screen.findByTestId(INGREDIENT);
    const surpriseBtn = await screen.findByTestId(SURPRISE);

    expect(ingredientBtn).toBeInTheDocument();
    expect(surpriseBtn).toBeInTheDocument();

    expect(ingredientBtn.innerHTML).toBe('By Ingredient');
    expect(screen.queryByText('By Nationality')).toBeNull();
    expect(surpriseBtn.innerHTML).toBe('Surprise me!');

    fireEvent.click(ingredientBtn);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });
});
