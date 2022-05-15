import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const oneDrink = require('../../cypress/mocks/oneDrink');

const TITLE = 'recipe-title';
const IMG = 'recipe-photo';
const CATEGORY = 'recipe-category';
const FAVORITE = 'favorite-btn';
const SHARE_BTN = 'share-btn';
const INSTRUCTIONS = 'instructions';
const STEP = 'ingredient-step';
const FINISH_BTN = 'finish-recipe-btn';
const DRINK_PATH = '/drinks/178319/in-progress';

const ingArr = [
  'Hpnotiq - 2 oz',
  'Pineapple Juice - 1 oz',
  'Banana Liqueur - 1 oz',
];

describe('Drinks inProgress tests', () => {
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
    history.push(DRINK_PATH);
    hasData();
  });

  it('Check checkboxes', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    const image = await screen.findByTestId(IMG);
    expect(image.src).toBe(oneDrink.drinks[0].strDrinkThumb);

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
    history.push(DRINK_PATH);

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
    history.push(DRINK_PATH);
    const favoritebtn = await screen.findByTestId(FAVORITE);
    expect(favoritebtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    fireEvent.click(favoritebtn);
    expect(favoritebtn).toHaveAttribute('src', 'blackHeartIcon.svg');

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const expectedFavoriteRecipes = [
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];

    expect(favoriteRecipes).toEqual(expectedFavoriteRecipes);
  });

  it('Check finish button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    const finishBtn = await screen.findByTestId(FINISH_BTN);
    expect(finishBtn).toHaveProperty('disabled', true);
  });

  it('Check localstorage remove function', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    const input = await screen.findByTestId('0-ingredient-step');
    const checkbox = input.querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);
    expect(checkbox).toHaveProperty('checked', true);

    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(getInProgressRecipes).toEqual(
      { cocktails: { 178319: ['Hpnotiq'] }, meals: {} },
    );

    fireEvent.click(checkbox);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipes).toEqual({ cocktails: {}, meals: {} });
  });

  // it('Check localstorage remove 1/2 function', async () => {
  //   const { history } = renderWithContext(<App />);
  //   history.push(DRINK_PATH);

  //   const input = await screen.findByTestId('0-ingredient-step');
  //   const inputTwo = await screen.findByTestId('1-ingredient-step');

  //   const checkbox = input.querySelector('input[type="checkbox"]');
  //   fireEvent.click(checkbox);
  //   expect(checkbox).toHaveProperty('checked', true);

  //   const checkboxTwo = inputTwo.querySelector('input[type="checkbox"]');
  //   fireEvent.click(checkboxTwo);
  //   expect(checkboxTwo).toHaveProperty('checked', true);
  //   fireEvent.click(checkbox);

  //   const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   expect(inProgressRecipes).toEqual({ cocktails: {}, meals: {} });
  // });
});
