import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const drinksMock = require('../../cypress/mocks/drinks');
const ordinaryDrinksMock = require('../../cypress/mocks/ordinaryDrinks');
const cocktailDrinksMock = require('../../cypress/mocks/cocktailDrinks');
const milkDrinksMock = require('../../cypress/mocks/milkDrinks');
const otherDrinksMock = require('../../cypress/mocks/otherDrinks');
const cocoaDrinksMock = require('../../cypress/mocks/cocoaDrinks');

const drinkCategories = {
  drinks: [
    { strCategory: 'Ordinary Drink' },
    { strCategory: 'Cocktail' },
    { strCategory: 'Shake' },
    { strCategory: 'Other/Unknown' },
    { strCategory: 'Cocoa' },
    { strCategory: 'Shot' },
    { strCategory: 'Coffee / Tea' },
    { strCategory: 'Homemade Liqueur' },
    { strCategory: 'Punch / Party Drink' },
    { strCategory: 'Beer' },
    { strCategory: 'Soft Drink / Soda' },
  ],
};

const DRINKS_PATH = '/drinks';
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
        .toHaveAttribute('src', recipe.strDrinkThumb);
      expect(await screen.findByTestId(`${index}-card-name`).textContent)
        .toBe(recipe.strDrinkThumb);
    });
    await hasNull();
  };

  it('Check drinks cards', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);

    await screen.findByTestId('0-recipe-card');

    for (let index = 0; index < TWELVE; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    await hasNull();
  });

  it('Check drinks recipes(12)', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);

    await checkFirstTwelveRecipes(drinksMock.drinks);
  });

  it('Check drinks categories', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);

    await screen.findByTestId('Ordinary Drink-category-filter');

    for (let i = 0; i < FIVE; i += 1) {
      expect(screen.getByTestId(
        `${drinkCategories.drinks.slice(0, FIVE)[i].strCategory}-category-filter`,
      )).toBeInTheDocument();
    }

    for (let i = 0; i < FIVE; i += 1) {
      expect(screen.queryByTestId(
        `${drinkCategories.drinks.slice(FIVE)[i].strCategory}-category-filter`,
      )).toBeNull();
    }
  });

  it('Check Ordinary Drink categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);
    fireEvent.click(await screen.findByTestId('Ordinary Drink-category-filter'));
    await checkFirstTwelveRecipes(ordinaryDrinksMock.drinks);
  });

  it('Check Cocktail categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);
    fireEvent.click(await screen.findByTestId('Cocktail-category-filter'));
    await checkFirstTwelveRecipes(cocktailDrinksMock.drinks);
  });

  it('Check Shake categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);
    fireEvent.click(await screen.findByTestId('Shake-category-filter'));
    await checkFirstTwelveRecipes(milkDrinksMock.drinks);
  });

  it('Check Other/Unknown categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);
    fireEvent.click(await screen.findByTestId('Other/Unknown-category-filter'));
    await checkFirstTwelveRecipes(otherDrinksMock.drinks);
  });

  it('Check Cocoa categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);
    fireEvent.click(await screen.findByTestId('Cocoa-category-filter'));
    await checkFirstTwelveRecipes(cocoaDrinksMock.drinks);
  });

  it('Check ALL categorie filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINKS_PATH);
    fireEvent.click(await screen.findByTestId('All-category-filter'));
    await checkFirstTwelveRecipes(drinksMock.drinks);

    const corba = await screen.findByText('GG');
    fireEvent.click(corba);
    expect(history.location.pathname).toBe(`/drinks/${drinksMock.drinks[0].idDrink}`);
  });
});
