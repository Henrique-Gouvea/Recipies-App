import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Foods from '../pages/Foods';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/explore/ExploreFoods';
import Drinks from '../pages/Drinks';
import ExploreDrinks from '../pages/explore/ExploreDrinks';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const FOOTER_ID = 'footer';
const DRINKS_ID = 'drinks-bottom-btn';
const EXPLORE_ID = 'explore-bottom-btn';
const FOOD_ID = 'food-bottom-btn';
const EXPLORE_SURPRISE = 'explore-surprise';

describe('Footer tests', () => {
  afterEach(cleanup);

  const hasFooter = async () => {
    expect(screen.getByTestId(FOOTER_ID)).toBeInTheDocument();
    expect(screen.getByTestId(DRINKS_ID)).toBeInTheDocument();
    expect(screen.getByTestId(EXPLORE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(FOOD_ID)).toBeInTheDocument();
  };

  const hasNoFooter = async () => {
    expect(() => screen.getByTestId(FOOTER_ID)).toThrow();
    expect(() => screen.getByTestId(DRINKS_ID)).toThrow();
    expect(() => screen.getByTestId(EXPLORE_ID)).toThrow();
    expect(() => screen.getByTestId(FOOD_ID)).toThrow();
  };

  it('Check icons', async () => {
    renderWithContext(<Foods />);
    expect(await screen.findByTestId(DRINKS_ID)).toHaveAttribute('src', 'drinkIcon.svg');
    expect(screen.getByTestId(EXPLORE_ID)).toHaveAttribute('src', 'exploreIcon.svg');
    expect(screen.getByTestId(FOOD_ID)).toHaveAttribute('src', 'mealIcon.svg');
  });

  it('Check routes', async () => {
    const { history } = renderWithContext(<Foods />);

    fireEvent.click(await screen.findByTestId(DRINKS_ID));
    expect(history.location.pathname).toBe('/drinks');

    fireEvent.click(screen.getByTestId(EXPLORE_ID));
    expect(history.location.pathname).toBe('/explore');

    fireEvent.click(screen.getByTestId(FOOD_ID));
    expect(history.location.pathname).toBe('/foods');
  });

  it('Check Login', async () => {
    renderWithContext(<Login />);
    await screen.findByText('E-mail');
    hasNoFooter();
  });

  it('Check Foods', async () => {
    renderWithContext(<Foods />);
    await screen.findAllByText('Foods');
    hasFooter();
  });

  it('Check Explore', async () => {
    renderWithContext(<Explore />);
    expect(await screen.findByTestId('explore-foods')).toBeInTheDocument();
    hasFooter();
  });

  it('Check Explore Foods', async () => {
    renderWithContext(<ExploreFoods />);
    expect(await screen.findByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(await screen.findByTestId('explore-by-nationality')).toBeInTheDocument();
    expect(await screen.findByTestId(EXPLORE_SURPRISE)).toBeInTheDocument();
    hasFooter();
  });

  it('Check Drinks', async () => {
    renderWithContext(<Drinks />);
    await screen.findAllByText('Drinks');
    hasFooter();
  });

  it('Check Explore Drinks', async () => {
    renderWithContext(<ExploreDrinks />);
    expect(await screen.findByTestId('page-title')).toBeInTheDocument();
    expect(await screen.findByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(await screen.findByTestId(EXPLORE_SURPRISE)).toBeInTheDocument();
    hasFooter();
  });

  it('Check Profile', async () => {
    renderWithContext(<Profile />);
    expect(await screen.findByTestId('profile-email')).toBeInTheDocument();
    expect(await screen.findByTestId('profile-done-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('profile-logout-btn')).toBeInTheDocument();
    hasFooter();
  });

  it('Check Done recipes', async () => {
    renderWithContext(<DoneRecipes />);
    expect(await screen.findByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('filter-by-drink-btn')).toBeInTheDocument();
    hasNoFooter();
  });

  it('Check Favorite recipes', async () => {
    renderWithContext(<FavoriteRecipes />);
    expect(await screen.findByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('filter-by-drink-btn')).toBeInTheDocument();
    hasNoFooter();
  });
});
