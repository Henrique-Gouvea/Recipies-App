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
const INGREDIENT = '0-ingredient-name-and-measure';
const INSTRUCTIONS = 'instructions';
const VIDEO = 'video';
const RECOMENDATION = '0-recomendation-card';
const START_BTN = 'start-recipe-btn';
const DRINK_PATH = '/drinks/178319';

const inProgressRecipes = {
  cocktails: {
    178319: [],
  },
};

const favoriteRecipes = [{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
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
    expect(await screen.findByTestId(RECOMENDATION)).toBeInTheDocument();
    expect(await screen.findByTestId(START_BTN)).toBeInTheDocument();
    expect(await screen.findByTestId(SHARE_BTN)).toBeInTheDocument();
  }

  it('Check drink screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);
    const recipeTitle = await screen.findByTestId(TITLE);
    expect(recipeTitle.innerHTML).toBe('Aquamarine');

    await hasData();

    const instruction = await screen.findByTestId(INSTRUCTIONS);
    const instructionBool = instruction.innerHTML.includes(
      oneDrink.drinks[0].strInstructions.split('.')[0],
    );
    expect(instructionBool).toBe(true);

    expect(screen.queryByTestId(VIDEO)).toBeNull();

    const recomendation = await screen.findByTestId(RECOMENDATION);
    expect(recomendation).toBeTruthy();
  });

  it('Check drink ingredients', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    const image = await screen.findByTestId(IMG);
    expect(image.src).toBe(oneDrink.drinks[0].strDrinkThumb);

    const category = await screen.findByTestId(CATEGORY);
    expect(category.innerHTML).toBe('Alcoholic');

    const ingArr = [
      'Hpnotiq - 2 oz',
      'Pineapple Juice - 1 oz',
      'Banana Liqueur - 1 oz',
    ];

    for (let index = 0; index < ingArr.length; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-name-and-measure`)
        .textContent).toBe(ingArr[index]);
    }
  });

  it('Check drink recomendations', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    expect(await screen.findByTestId('0-recomendation-title')).toBeInTheDocument();
    const titleArr = ['Corba', 'Burek', 'Kumpir', 'Tamiya', 'Dal fry', 'Poutine'];

    for (let index = 0; index < titleArr.length; index += 1) {
      expect(screen.getByTestId(`${index}-recomendation-title`)
        .textContent).toBe(titleArr[index]);
    }
  });

  it('Check start button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);
    const btn = await screen.findByTestId(START_BTN);
    expect(btn.textContent).toBe('Start Recipe');

    fireEvent.click(btn);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });

  it('Check continue button', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);
    const continueBtn = await screen.findByTestId(START_BTN);
    expect(continueBtn.textContent).toBe('Continue Recipe');
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
  });

  it('Check favorited drink', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);
    const favoritebtn = await screen.findByTestId(FAVORITE);
    expect(favoritebtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    fireEvent.click(favoritebtn);
    expect(favoritebtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
