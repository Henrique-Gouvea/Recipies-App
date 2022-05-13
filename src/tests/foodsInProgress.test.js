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
const INSTRUCTIONS = 'instructions';
const STEP = 'ingredient-step';
const FINISH_BTN = 'finish-recipe-btn';
const FOOD_PATH = '/foods/52771/in-progress';

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

describe('Foods inProgress tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(cleanup);

  const reloadFn = () => {
    window.location.reload(true);
  };

  async function hasData() {
    expect(await screen.findByTestId(TITLE)).toBeInTheDocument();
    expect(await screen.findByTestId(IMG)).toBeInTheDocument();
    expect(await screen.findByTestId(CATEGORY)).toBeInTheDocument();
    expect(await screen.findByTestId(FAVORITE)).toBeInTheDocument();
    expect(await screen.findByTestId(INSTRUCTIONS)).toBeInTheDocument();
    expect(await screen.findByTestId(STEP)).toBeInTheDocument();
    expect(await screen.findByTestId(FINISH_BTN)).toBeInTheDocument();
    expect(await screen.findByTestId(SHARE_BTN)).toBeInTheDocument();
  }

  it('Check screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);
    hasData();
  });

  it('Check checkboxes', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    const image = await screen.findByTestId(IMG);
    expect(image.src).toBe(oneMeal.meals[0].strMealThumb);

    for (let index = 0; index < ingArr.length; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-step`)
        .textContent).toBe(ingArr[index]);
    }

    const input = await screen.findByTestId('0-ingredient-step');
    const checkbox = input.querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);
    expect(checkbox).toHaveProperty('checked', true);

    reloadFn();
    expect(checkbox).toHaveProperty('checked', true);
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

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const expectedFavoriteRecipes = [
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ];

    expect(favoriteRecipes).toEqual(expectedFavoriteRecipes);
  });

  it('Check finish button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    const finishBtn = await screen.findByTestId(FINISH_BTN);
    expect(finishBtn).toHaveProperty('disabled', true);
  });
});
