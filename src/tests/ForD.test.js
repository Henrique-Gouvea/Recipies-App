import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderServingContext from './renderServingContext';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import renderWithContext from './renderWithContext';

const mealsMock = require('../../cypress/mocks/meals');
const drinksMock = require('../../cypress/mocks/drinks');
const mealCategoriesMock = require('../../cypress/mocks/mealCategories');
const drinkCategoriesMock = require('../../cypress/mocks/drinkCategories');
const beefMeals = require('../../cypress/mocks/beefMeals');
const breakfastMeals = require('../../cypress/mocks/breakfastMeals');
const chickenMeals = require('../../cypress/mocks/chickenMeals');
const dessertMeals = require('../../cypress/mocks/dessertMeals');
const goatMeals = require('../../cypress/mocks/goatMeals');
const ordinaryDrinks = require('../../cypress/mocks/ordinaryDrinks');
const cocktailDrinks = require('../../cypress/mocks/cocktailDrinks');
const milkDrinks = require('../../cypress/mocks/milkDrinks');
const otherDrinks = require('../../cypress/mocks/otherDrinks');
const cocoaDrinks = require('../../cypress/mocks/cocoaDrinks');

describe('Login tests', () => {
  afterEach(cleanup);

  function testCards() {
    expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('11-card-img')).toBeInTheDocument();
    expect(screen.getByTestId('11-card-name')).toBeInTheDocument();
    expect(() => screen.getByTestId('12-recipe-card')).toThrow();
    expect(() => screen.getByTestId('12-card-img')).toThrow();
    expect(() => screen.getByTestId('12-card-name')).toThrow();
  }

  it('Check foods cards', () => {
    renderServingContext(<Foods />, { recipeFoods: mealsMock.meals });
    testCards();
    const themealdb = screen.getByTestId('1-card-img').src.includes('thecocktaildb');
    expect(themealdb).toBe(false);
  });

  it('Check drinks cards', () => {
    renderServingContext(<Drinks />, { recipeDrinks: drinksMock.drinks });
    testCards();
    const thecocktaildb = screen.getByTestId('1-card-img').src.includes('themealdb');
    expect(thecocktaildb).toBe(false);
  });

  it('Check foods categories', () => {
    renderServingContext(<Foods />, { foodCategories: mealCategoriesMock.meals });
    const categories = document.querySelector('.categories').children;
    expect(categories[0].value).toBe('Beef');
    expect(categories[4].value).toBe('Goat');
    expect(categories.length).toBe(+'6');
  });

  it('Check drinks categories', () => {
    renderServingContext(<Drinks />, { drinkCategories: drinkCategoriesMock.drinks });
    const categories = document.querySelector('.categories').children;
    expect(categories[0].value).toBe('Ordinary Drink');
    expect(categories[4].value).toBe('Cocoa');
    expect(categories.length).toBe(+'6');
  });

  it('Check foods categorie filter', async () => {
    const { history } = renderWithContext(<Foods />);
    await screen.findByText('Beef');
    fireEvent.click(screen.getByTestId('Beef-category-filter'));
    expect(await screen.findByText(beefMeals.meals[0].strMeal)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Breakfast-category-filter'));
    expect(await screen.findByText(breakfastMeals.meals[0].strMeal)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Chicken-category-filter'));
    expect(await screen.findByText(chickenMeals.meals[0].strMeal)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Dessert-category-filter'));
    expect(await screen.findByText(dessertMeals.meals[0].strMeal)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Goat-category-filter'));
    expect(await screen.findByText(goatMeals.meals[0].strMeal)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('All-category-filter'));
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();

    fireEvent.click(corba);
    expect(history.location.pathname).toBe(`/foods/${mealsMock.meals[0].idMeal}`);
  });

  it('Check drinks categorie filter', async () => {
    const { history } = renderWithContext(<Drinks />);
    await screen.findByText('Ordinary Drink');
    fireEvent.click(screen.getByTestId('Ordinary Drink-category-filter'));
    expect(await screen.findByText(ordinaryDrinks.drinks[0]
      .strDrink)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Cocktail-category-filter'));
    expect(await screen.findByText(cocktailDrinks.drinks[1]
      .strDrink)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Shake-category-filter'));
    expect(await screen.findByText(milkDrinks.drinks[0].strDrink)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Other/Unknown-category-filter'));
    expect(await screen.findByText(otherDrinks.drinks[0].strDrink)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Cocoa-category-filter'));
    expect(await screen.findByText(cocoaDrinks.drinks[0].strDrink)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('All-category-filter'));
    const GG = await screen.findByText('GG');
    expect(GG).toBeInTheDocument();

    fireEvent.click(GG);
    expect(history.location.pathname).toBe(`/drinks/${drinksMock.drinks[0].idDrink}`);
  });
});
