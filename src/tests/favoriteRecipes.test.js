import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const FILTER_ALL = 'filter-by-all-btn';
const FILTER_FOOD = 'filter-by-food-btn';
const FILTER_DRINK = 'filter-by-drink-btn';
const H_IMG = '0-horizontal-image';
const H_TEXT = '0-horizontal-top-text';
const H_NAME = '0-horizontal-name';
const H_FAV = '0-horizontal-favorite-btn';
const H_SHARE = '0-horizontal-share-btn';
const H_IMG_ONE = '1-horizontal-image';
const H_TEXT_ONE = '1-horizontal-top-text';
const H_NAME_ONE = '1-horizontal-name';
const H_FAV_ONE = '1-horizontal-favorite-btn';
const H_SHARE_ONE = '1-horizontal-share-btn';
const PATH = '/favorite-recipes';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
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

describe('Favorite recipes tests', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('Check screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    expect(await screen.findByTestId(FILTER_ALL)).toBeInTheDocument();
    expect(await screen.findByTestId(FILTER_FOOD)).toBeInTheDocument();
    expect(await screen.findByTestId(FILTER_DRINK)).toBeInTheDocument();
    expect(await screen.findByTestId(H_IMG)).toBeInTheDocument();
    expect(await screen.findByTestId(H_TEXT)).toBeInTheDocument();
    expect(await screen.findByTestId(H_NAME)).toBeInTheDocument();
    expect(await screen.findByTestId(H_FAV)).toBeInTheDocument();
    expect(await screen.findByTestId(H_SHARE)).toBeInTheDocument();
    expect(await screen.findByTestId(H_IMG_ONE)).toBeInTheDocument();
    expect(await screen.findByTestId(H_TEXT_ONE)).toBeInTheDocument();
    expect(await screen.findByTestId(H_NAME_ONE)).toBeInTheDocument();
    expect(await screen.findByTestId(H_FAV_ONE)).toBeInTheDocument();
    expect(await screen.findByTestId(H_SHARE_ONE)).toBeInTheDocument();
  });

  it('Check foods cards', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    expect(await screen.findByTestId(H_IMG))
      .toHaveAttribute('src', favoriteRecipes[0].image);
    expect(screen.getByTestId(H_TEXT).textContent)
      .toBe(`${favoriteRecipes[0].nationality} - ${favoriteRecipes[0].category} - `);
    expect(screen.getByTestId(H_NAME).textContent).toBe(favoriteRecipes[0].name);
    expect(screen.getByTestId(H_SHARE)).toHaveAttribute('src', 'shareIcon.svg');
    expect(screen.getByTestId(H_FAV)).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Check drinks cards', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    expect(await screen.findByTestId(H_IMG_ONE))
      .toHaveAttribute('src', favoriteRecipes[1].image);
    expect(screen.getByTestId(H_TEXT_ONE).textContent)
      .toBe(' - Cocktail - Alcoholic');
    expect(screen.getByTestId(H_NAME_ONE).textContent).toBe(favoriteRecipes[1].name);
    expect(screen.getByTestId(H_SHARE_ONE)).toHaveAttribute('src', 'shareIcon.svg');
    expect(screen.getByTestId(H_FAV_ONE)).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Check share button one', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    const shareBtn = await screen.findByTestId(H_SHARE);

    fireEvent.click(shareBtn);
    expect(window.navigator.clipboard.writeText)
      .toHaveBeenCalledWith('http://localhost:3000/foods/52771');
  });

  it('Check unfavorite button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    const favBtnOne = await screen.findByTestId(H_FAV_ONE);

    fireEvent.click(favBtnOne);
    expect(screen.getByTestId(H_NAME).textContent).toBe(favoriteRecipes[0].name);
    expect(await screen.queryByTestId(H_NAME_ONE)).toBeNull();
  });

  it('Check unfavorite button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    const favBtn = await screen.findByTestId(H_FAV);

    fireEvent.click(favBtn);
    expect(screen.getByTestId(H_NAME).textContent).toBe(favoriteRecipes[1].name);
    expect(screen.queryByTestId(H_NAME_ONE)).toBeNull();
  });

  it('Check food filter button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    const foodFilter = await screen.findByTestId(FILTER_FOOD);

    fireEvent.click(foodFilter);
    expect(screen.getByTestId(H_NAME).textContent).toBe(favoriteRecipes[0].name);
    expect(await screen.queryByTestId(H_NAME_ONE)).toBeNull();
  });

  it('Check drink filter button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    const drinkFilter = await screen.findByTestId(FILTER_DRINK);

    fireEvent.click(drinkFilter);
    expect(screen.getByTestId(H_NAME).textContent).toBe(favoriteRecipes[1].name);
    expect(await screen.queryByTestId(H_NAME_ONE)).toBeNull();
  });

  it('Check food redirect', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    const IMG = await screen.findByTestId(H_IMG);

    fireEvent.click(IMG);
    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Check drink redirect', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    const IMG_ONE = await screen.findByTestId(H_IMG_ONE);

    fireEvent.click(IMG_ONE);
    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
