import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const oneMeal = require('../../cypress/mocks/oneMeal');

const TITLE = 'recipe-title';
const IMG = 'recipe-photo';
const CATEGORY = 'recipe-category';
const FAVORITE = 'favorite-btn';
const SHARE_BTN = 'share-btn';
const INGREDIENT = '0-ingredient-name-and-measure';
const INSTRUCTIONS = 'instructions';
const VIDEO = 'video';
const RECOMENDATION = '0-recomendation-card';
const START_BTN = 'start-recipe-btn';
const FOOD_PATH = '/foods/52771';

const inProgressRecipes = {
  meals: {
    52771: [],
  },
};

const favoriteRecipes = [{
  id: '52771',
  type: 'food',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
}];

describe('Details tests', () => {
  afterEach(cleanup);

  async function hasData() {
    expect(await screen.findByTestId(TITLE)).toBeInTheDocument();
    expect(await screen.findByTestId(IMG)).toBeInTheDocument();
    expect(await screen.findByTestId(CATEGORY)).toBeInTheDocument();
    expect(await screen.findByTestId(FAVORITE)).toBeInTheDocument();
    expect(await screen.findByTestId(INGREDIENT)).toBeInTheDocument();
    expect(await screen.findByTestId(INSTRUCTIONS)).toBeInTheDocument();
    expect(await screen.findByTestId(VIDEO)).toBeInTheDocument();
    expect(await screen.findByTestId(RECOMENDATION)).toBeInTheDocument();
    expect(await screen.findByTestId(START_BTN)).toBeInTheDocument();
    expect(await screen.findByTestId(SHARE_BTN)).toBeInTheDocument();
  }

  it('Check food screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);
    const recipeTitle = await screen.findByTestId(TITLE);
    expect(recipeTitle.innerHTML).toBe('Spicy Arrabiata Penne');

    await hasData();

    const instruction = await screen.findByTestId(INSTRUCTIONS);
    const instructionBool = instruction.innerHTML.includes(
      oneMeal.meals[0].strInstructions.split('.')[0],
    );
    expect(instructionBool).toBe(true);

    const video = await screen.findByTestId(VIDEO);
    const recomendation = await screen.findByTestId(RECOMENDATION);
    expect(video && recomendation).toBeTruthy();
  });

  it('Check food ingredients', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    const image = await screen.findByTestId(IMG);
    expect(image.src).toBe(oneMeal.meals[0].strMealThumb);

    const category = await screen.findByTestId(CATEGORY);
    expect(category.innerHTML).toBe('Vegetarian');

    const ingArr = [
      'penne rigate - 1 pound',
      'olive oil - 1/4 cup',
      'garlic - 3 cloves',
      'chopped tomatoes - 1 tin ',
      'red chile flakes - 1/2 teaspoon',
      'italian seasoning - 1/2 teaspoon',
      'basil - 6 leaves',
      'Parmigiano-Reggiano - spinkling',
    ];

    for (let index = 0; index < ingArr.length; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-name-and-measure`)
        .textContent).toBe(ingArr[index]);
    }
  });

  it('Check food recomendations', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    expect(await screen.findByTestId('0-recomendation-title')).toBeInTheDocument();
    const titleArr = ['GG', 'A1', 'ABC', 'Kir', '747', '252'];

    for (let index = 0; index < titleArr.length; index += 1) {
      expect(screen.getByTestId(`${index}-recomendation-title`)
        .textContent).toBe(titleArr[index]);
    }
  });

  it('Check start button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);
    const btn = await screen.findByTestId(START_BTN);
    expect(btn.textContent).toBe('Start Recipe');

    fireEvent.click(btn);
    expect(history.location.pathname).toBe('/foods/52771/in-progress');
  });

  it('Check continue button', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);
    const continueBtn = await screen.findByTestId(START_BTN);
    expect(continueBtn.textContent).toBe('Continue Recipe');
  });

  it('Check share button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    const shareBtn = await screen.findByTestId(SHARE_BTN);
    expect(shareBtn.textContent).toBe('Share');

    fireEvent.click(shareBtn);
    expect(window.navigator.clipboard.writeText)
      .toHaveBeenCalledWith(window.location.href);
  });

  it('Check favorite button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);
    const favoritebtn = await screen.findByTestId(FAVORITE);
    expect(favoritebtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    fireEvent.click(favoritebtn);
    expect(favoritebtn).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Check favorited food', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);
    const favoritebtn = await screen.findByTestId(FAVORITE);
    expect(favoritebtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    fireEvent.click(favoritebtn);
    expect(favoritebtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
