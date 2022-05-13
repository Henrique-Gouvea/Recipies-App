import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const mealsMock = require('../../cypress/mocks/mealIngredients');
const drinksMock = require('../../cypress/mocks/drinkIngredients');
const mealsByIngredientMock = require('../../cypress/mocks/mealsByIngredient');
const drinksByIngredientMock = require('../../cypress/mocks/drinksByIngredient');

const FOOD_PATH = '/explore/foods/ingredients';
const DRINK_PATH = '/explore/drinks/ingredients';
const TWELVE = 12;

describe('Explore ingredients tests', () => {
  afterEach(cleanup);

  async function hasNull() {
    expect(await screen.queryByTestId('12-ingredient-card')).toBeNull();
    expect(await screen.queryByTestId('12-card-img')).toBeNull();
    expect(await screen.queryByTestId('12-card-name')).toBeNull();
  }

  it('Check Drinks screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    await screen.findByTestId('0-ingredient-card');

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    await hasNull();
  });

  it('Check Drinks cards', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    await screen.findByTestId('0-card-img');

    drinksMock.drinks.slice(0, TWELVE).forEach((ingredient, index) => {
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`);
      expect(screen.getByTestId(`${index}-card-name`)
        .textContent).toBe(ingredient.strIngredient1);
    });
  });

  it('Check Foods screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    await screen.findByTestId('0-ingredient-card');

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    await hasNull();
  });

  it('Check Foods cards', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    await screen.findByTestId('0-card-img');

    mealsMock.meals.slice(0, TWELVE).forEach((ingredient, index) => {
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`);
      expect(screen.getByTestId(`${index}-card-name`)
        .textContent).toBe(ingredient.strIngredient);
    });
  });

  it('Check Foods redirect', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    const ing = await screen.findByTestId('0-card-name');
    fireEvent.click(ing);

    mealsByIngredientMock.meals.slice(0, TWELVE).forEach((meal, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', meal.strMealThumb);
      expect(screen.getByTestId(`${index}-card-name`)
        .textContent).toBe(meal.strMeal);
    });
  });

  it('Check drinks redirect', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    const ing = await screen.findByTestId('0-card-name');
    fireEvent.click(ing);

    drinksByIngredientMock.drinks.slice(0, TWELVE).forEach((drink, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', drink.strDrinkThumb);
      expect(screen.getByTestId(`${index}-card-name`)
        .textContent).toBe(drink.strDrink);
    });
  });
});
