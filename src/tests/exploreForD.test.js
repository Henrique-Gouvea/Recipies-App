import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const INGREDIENT = 'explore-by-ingredient';
const NATIONALITY = 'explore-by-nationality';
const SURPRISE = 'explore-surprise';
const FOOD_PATH = '/explore/foods';
const DRINK_PATH = '/explore/drinks';

describe('Header tests', () => {
  afterEach(cleanup);

  it('Check explore foods screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/foods');

    const ingredientBtn = await screen.findByTestId(INGREDIENT);
    const nationalityBtn = await screen.findByTestId(NATIONALITY);
    const surpriseBtn = await screen.findByTestId(SURPRISE);

    expect(ingredientBtn).toBeInTheDocument();
    expect(nationalityBtn).toBeInTheDocument();
    expect(surpriseBtn).toBeInTheDocument();

    expect(ingredientBtn.innerHTML).toBe('By Ingredient');
    expect(nationalityBtn.innerHTML).toBe('By Nationality');
    expect(surpriseBtn.innerHTML).toBe('Surprise me!');
  });

  it('Check explore foods by ingredient button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    const ingredientBtn = await screen.findByTestId(INGREDIENT);
    fireEvent.click(ingredientBtn);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  it('Check explore foods by nationality button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    const nationalityBtn = await screen.findByTestId(NATIONALITY);
    fireEvent.click(nationalityBtn);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  it('Check explore foods surprise button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);

    const surpriseBtn = await screen.findByTestId(SURPRISE);
    fireEvent.click(surpriseBtn);
    console.log(history.location.pathname);
    expect(history.location.pathname).not.toBe('/explore/foods/');
  });

  it('Check explore drinks screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    const ingredientBtn = await screen.findByTestId(INGREDIENT);
    const surpriseBtn = await screen.findByTestId(SURPRISE);

    expect(ingredientBtn).toBeInTheDocument();
    expect(surpriseBtn).toBeInTheDocument();

    expect(ingredientBtn.innerHTML).toBe('By Ingredient');
    expect(screen.queryByText('By Nationality')).toBeNull();
    expect(surpriseBtn.innerHTML).toBe('Surprise me!');
  });

  it('Check explore drinks by ingredient button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    const ingredientBtn = await screen.findByTestId(INGREDIENT);
    fireEvent.click(ingredientBtn);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  it('Check explore drinks surprise button', async () => {
    const { history } = renderWithContext(<App />);
    history.push(DRINK_PATH);

    const surpriseBtn = await screen.findByTestId(SURPRISE);
    fireEvent.click(surpriseBtn);
    console.log(history.location.pathname);
    expect(history.location.pathname).not.toBe('/explore/drinks/');
  });
});
