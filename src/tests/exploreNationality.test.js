import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
// import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './renderWithContext';
import App from '../App';

const mealCategoriesMock = require('../../cypress/mocks/mealCategories');
const areasMock = require('../../cypress/mocks/areas');
const mealsMock = require('../../cypress/mocks/meals');
const japaneseMealsMock = require('../../cypress/mocks/japaneseMeals');
const italianMealsMock = require('../../cypress/mocks/italianMeals');

const PATH = '/explore/foods/nationalities';
const TWELVE = 12;
const FIVE = 5;
const carName = '0-card-name';
// const expByNatDrop = 'explore-by-nationality-dropdown';

describe('Explore nationalities tests', () => {
  afterEach(cleanup);

  async function hasNull() {
    expect(await screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(await screen.queryByTestId('12-card-img')).toBeNull();
    expect(await screen.queryByTestId('12-card-name')).toBeNull();
  }

  const checkFirstMeals = async (meals, limit = TWELVE) => {
    await screen.findByTestId(carName);

    meals.slice(0, limit).forEach((meal, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', meal.strMealThumb);
      // expect(screen.getByTestId(`${index}-card-name`).textContent)
      //  .toBe(meal.strMealThumb);
    });

    expect(await screen.queryByTestId(`${limit}-recipe-card`)).toBeNull();
    expect(await screen.queryByTestId(`${limit}-card-img`)).toBeNull();
    expect(await screen.queryByTestId(`${limit}-card-name`)).toBeNull();
  };

  it('Check screen elements', async () => { // OK!
    const { history } = renderWithContext(<App />);
    history.push(PATH);
    await screen.findByTestId(carName);

    expect(await screen.queryByTestId('All-category-filter')).toBeNull();

    mealCategoriesMock.meals.forEach(({ strCategory: category }) => {
      expect(screen.queryByTestId(`${category}-category-filter`)).toBeNull();
    });

    expect(await screen.findByTestId('explore-by-nationality-dropdown'))
      .toBeInTheDocument();

    areasMock.meals.forEach(({ strArea: area }) => {
      expect(screen.getByTestId(`${area}-option`)).toBeInTheDocument();
    });

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    hasNull();
  });

  it('Check twelve meals', async () => { // OK
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    checkFirstMeals(mealsMock.meals);
  });

  it('Check select options', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);
    const dropdown = await screen.findByTestId('explore-by-nationality-dropdown');

    userEvent.selectOptions(dropdown, 'Japanese');
    checkFirstMeals(japaneseMealsMock.meals, FIVE);

    userEvent.selectOptions(dropdown, 'Italian');
    checkFirstMeals(italianMealsMock.meals);
  });

  it('Check redirect', async () => { // async
    const { history } = renderWithContext(<App />);
    history.push(PATH);
    // const card = await screen.findByTestId('0-recipe-card');
    const card = await screen.findByTestId('0-card-name'); // await
    fireEvent.click(card);
    expect(history.location.pathname).toBe('/foods/52977');
  });

  it('Check area options', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);
    await screen.findByTestId(carName);

    expect(screen.getByTestId('All-option').textContent).toBe('All');
    areasMock.meals.forEach(({ strArea: area }) => {
      expect(screen.getByTestId(`${area}-option`).textContent).toBe(area);
    });
  });

  it('Check All option', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    const dropdown = await screen.findByTestId('explore-by-nationality-dropdown');

    userEvent.selectOptions(dropdown, 'Japanese');
    checkFirstMeals(japaneseMealsMock.meals, FIVE);

    userEvent.selectOptions(dropdown, 'All');
    checkFirstMeals(mealsMock.meals);
  });
});
