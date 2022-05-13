import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const FOOTER_ID = 'footer';
const DRINKS_ID = 'drinks-bottom-btn';
const EXPLORE_ID = 'explore-bottom-btn';
const FOOD_ID = 'food-bottom-btn';
const PATH = '/foods';

describe('Footer tests', () => {
  afterEach(cleanup);

  const hasFooter = async () => {
    expect(await screen.findByTestId(FOOTER_ID)).toBeInTheDocument();
    expect(await screen.findByTestId(DRINKS_ID)).toBeInTheDocument();
    expect(await screen.findByTestId(EXPLORE_ID)).toBeInTheDocument();
    expect(await screen.findByTestId(FOOD_ID)).toBeInTheDocument();
  };

  const hasNoFooter = async () => {
    expect(await screen.queryByTestId(FOOTER_ID)).toBeNull();
    expect(await screen.queryByTestId(DRINKS_ID)).toBeNull();
    expect(await screen.queryByTestId(EXPLORE_ID)).toBeNull();
    expect(await screen.queryByTestId(FOOD_ID)).toBeNull();
  };

  it('Check icons', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    expect(await screen.findByTestId(DRINKS_ID)).toHaveAttribute('src', 'drinkIcon.svg');
    expect(await screen.findByTestId(EXPLORE_ID))
      .toHaveAttribute('src', 'exploreIcon.svg');
    expect(await screen.findByTestId(FOOD_ID)).toHaveAttribute('src', 'mealIcon.svg');
  });

  it('Check routes', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    fireEvent.click(await screen.findByTestId(DRINKS_ID));
    expect(history.location.pathname).toBe('/drinks');

    fireEvent.click(screen.getByTestId(EXPLORE_ID));
    expect(history.location.pathname).toBe('/explore');

    fireEvent.click(screen.getByTestId(FOOD_ID));
    expect(history.location.pathname).toBe('/foods');
  });

  it('Check Login', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/');
    await hasNoFooter();
  });

  it('Check Foods', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);
    await hasFooter();
  });

  it('Check Drinks', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks');
    await hasFooter();
  });

  it('Check Foods details', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods/52771');
    await hasNoFooter();
  });

  it('Check Drinks details', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks/178319');
    await hasNoFooter();
  });

  it('Check Foods in progress', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods/52771/in-progress');
    await hasNoFooter();
  });

  it('Check Drinks in progress', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks/178319/in-progress');
    await hasNoFooter();
  });

  it('Check Explore', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore');
    await hasFooter();
  });

  it('Check Explore Foods', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/foods');
    await hasFooter();
  });

  it('Check Explore drinks', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/drinks');
    await hasFooter();
  });

  it('Check Explore Foods ingredients', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/foods/ingredients');
    await hasFooter();
  });

  it('Check Explore drinks ingredients', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/drinks/ingredients');
    await hasFooter();
  });

  it('Check Explore foods nationalities', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/foods/nationalities');
    await hasFooter();
  });

  it('Check Profile', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/profile');
    await hasFooter();
  });

  it('Check Done recipes', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/done-recipes');
    await hasNoFooter();
  });

  it('Check Favorite recipes', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/favorite-recipes');
    await hasNoFooter();
  });
});
