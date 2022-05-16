import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const mealsMock = require('../../cypress/mocks/meals');
const mealCategoriesMock = require('../../cypress/mocks/mealCategories');
const beefMealsMock = require('../../cypress/mocks/beefMeals');
const breakfastMealsMock = require('../../cypress/mocks/breakfastMeals');
const chickenMealsMock = require('../../cypress/mocks/chickenMeals');
const dessertMealsMock = require('../../cypress/mocks/dessertMeals');
const goatMealsMock = require('../../cypress/mocks/goatMeals');

const FOODS_PATH = '/foods';
const TWELVE = 12;
const FIVE = 5;

describe('Recipe list tests', () => {
  afterEach(cleanup);

  async function hasNull() {
    expect(await screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(await screen.queryByTestId('12-card-img')).toBeNull();
    expect(await screen.queryByTestId('12-card-name')).toBeNull();
  }

  const checkFirstTwelveRecipes = async (recipes) => {
    await recipes.slice(0, TWELVE).forEach(async (recipe, index) => {
      expect(await screen.findByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(await screen.findByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(await screen.findByTestId(`${index}-card-img`))
        .toHaveAttribute('src', recipe.strMealThumb);
      expect(await screen.findByTestId(`${index}-card-name`).textContent)
        .toBe(recipe.strMealThumb);
    });

    await hasNull();
  };

  it('Check foods cards', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);

    await screen.findByTestId('0-recipe-card');

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    await hasNull();
  });

  it('Check foods recipes(12)', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);

    await checkFirstTwelveRecipes(mealsMock.meals);
  });

  it('Check foods categories', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);

    await screen.findByTestId('Beef-category-filter');

    for (let i = 0; i < FIVE; i += 1) {
      expect(screen.getByTestId(
        `${mealCategoriesMock.meals.slice(0, FIVE)[i].strCategory}-category-filter`,
      )).toBeInTheDocument();
    }

    for (let i = 0; i < FIVE; i += 1) {
      expect(screen.queryByTestId(
        `${mealCategoriesMock.meals.slice(FIVE)[i].strCategory}-category-filter`,
      )).toBeNull();
    }
  });

  it('Check beef categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);
    fireEvent.click(await screen.findByTestId('Beef-category-filter'));
    await checkFirstTwelveRecipes(beefMealsMock.meals);
  });

  it('Check breakfast categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);
    fireEvent.click(await screen.findByTestId('Breakfast-category-filter'));
    await checkFirstTwelveRecipes(breakfastMealsMock.meals);
  });

  it('Check chicken categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);
    fireEvent.click(await screen.findByTestId('Chicken-category-filter'));
    await checkFirstTwelveRecipes(chickenMealsMock.meals);
  });

  it('Check dessert categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);
    fireEvent.click(await screen.findByTestId('Dessert-category-filter'));
    await checkFirstTwelveRecipes(dessertMealsMock.meals);
  });

  it('Check goat categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);
    fireEvent.click(await screen.findByTestId('Goat-category-filter'));
    await checkFirstTwelveRecipes(goatMealsMock.meals);
  });

  it('Check ALL categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOODS_PATH);
    fireEvent.click(await screen.findByTestId('All-category-filter'));
    await checkFirstTwelveRecipes(mealsMock.meals);

    const corba = await screen.findByText('Corba');
    fireEvent.click(corba);
    expect(history.location.pathname).toBe(`/foods/${mealsMock.meals[0].idMeal}`);
  });
});
