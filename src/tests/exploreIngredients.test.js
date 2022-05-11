import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import IngredientsDrinks from '../pages/ingredients/IngredientsDrinks';
import IngredientsFoods from '../pages/ingredients/IngredientsFoods';

const mealsMock = require('../../cypress/mocks/mealIngredients');
const drinksMock = require('../../cypress/mocks/drinkIngredients');

const ingOne = '1-ingredient-card';
const imgOne = '1-card-img';
const nameOne = '1-card-name';
const ingEleven = '11-ingredient-card';
const imgEleven = '11-card-img';
const nameEleven = '11-card-name';

describe('Explore ingredients tests', () => {
  afterEach(cleanup);

  async function testCards() {
    expect(await screen.findByTestId(ingOne && ingEleven)).toBeInTheDocument();
    expect(await screen.findByTestId(imgOne && imgEleven)).toBeInTheDocument();
    expect(await screen.findByTestId(nameOne && nameEleven)).toBeInTheDocument();
    expect(await screen.queryByTestId('12-ingredient-card')).toBeNull();
    expect(await screen.queryByTestId('12-card-img')).toBeNull();
    expect(await screen.queryByTestId('12-card-name')).toBeNull();
  }

  it('Check Drinks screen elements', async () => {
    renderWithContext(<IngredientsDrinks />);
    testCards();
  });

  it('Check Drinks cards', async () => {
    renderWithContext(<IngredientsDrinks />);
    const img1 = await screen.findByTestId(imgOne);
    const name1 = await screen.findByTestId(nameOne);
    const img11 = await screen.findByTestId(imgEleven);
    const name11 = await screen.findByTestId(nameEleven);

    expect(img1.src).toBe(`https://www.thecocktaildb.com/images/ingredients/${drinksMock.drinks[1].strIngredient1}-Small.png`);
    expect(name1.innerHTML).toBe(drinksMock.drinks[1].strIngredient1);

    expect(img11.src).toBe(`https://www.thecocktaildb.com/images/ingredients/${drinksMock.drinks[11].strIngredient1}-Small.png`);
    expect(name11.innerHTML).toBe(drinksMock.drinks[11].strIngredient1);
  });

  it('Check Foods screen elements', async () => {
    renderWithContext(<IngredientsFoods />);
    testCards();
  });

  it('Check Foods cards', async () => {
    renderWithContext(<IngredientsFoods />);
    const img1 = await screen.findByTestId(imgOne);
    const name1 = await screen.findByTestId(nameOne);
    const img11 = await screen.findByTestId(imgEleven);
    const name11 = await screen.findByTestId(nameEleven);

    expect(img1.src).toBe(`https://www.themealdb.com/images/ingredients/${mealsMock.meals[1].strIngredient}-Small.png`);
    expect(name1.innerHTML).toBe(mealsMock.meals[1].strIngredient);

    expect(img11.src.includes(mealsMock
      .meals[11].strIngredient.split(' ')[0])).toBe(true);
    expect(name11.innerHTML).toBe(mealsMock.meals[11].strIngredient);
  });
});
