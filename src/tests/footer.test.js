import React from 'react';
import { screen, cleanup, act, fireEvent } from '@testing-library/react';
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

  const hasFooter = () => {
    expect(screen.getByTestId(FOOTER_ID)).toBeInTheDocument();
    expect(screen.getByTestId(DRINKS_ID)).toBeInTheDocument();
    expect(screen.getByTestId(EXPLORE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(FOOD_ID)).toBeInTheDocument();
  };

  const hasNoFooter = () => {
    expect(() => screen.getByTestId(FOOTER_ID)).toThrow();
    expect(() => screen.getByTestId(DRINKS_ID)).toThrow();
    expect(() => screen.getByTestId(EXPLORE_ID)).toThrow();
    expect(() => screen.getByTestId(FOOD_ID)).toThrow();
  };

  const checkID = (ID) => {
    expect(screen.getByTestId(ID)).toBeInTheDocument();
    hasFooter();
  };

  it('Check icons', async () => {
    await act(async () => {
      renderWithContext(<Foods />);
    });
    expect(screen.getByTestId(DRINKS_ID)).toHaveAttribute('src', 'drinkIcon.svg');
    expect(screen.getByTestId(EXPLORE_ID)).toHaveAttribute('src', 'exploreIcon.svg');
    expect(screen.getByTestId(FOOD_ID)).toHaveAttribute('src', 'mealIcon.svg');
  });

  it('Check routes', async () => {
    let hist = null;
    await act(async () => {
      const { history } = renderWithContext(<Foods />);
      hist = history;
    });

    fireEvent.click(screen.getByTestId(DRINKS_ID));
    expect(hist.location.pathname).toBe('/drinks');

    fireEvent.click(screen.getByTestId(EXPLORE_ID));
    expect(hist.location.pathname).toBe('/explore');

    fireEvent.click(screen.getByTestId(FOOD_ID));
    expect(hist.location.pathname).toBe('/foods');
  });

  it('Check Login', async () => {
    await act(async () => {
      renderWithContext(<Login />);
    });
    hasNoFooter();
  });

  it('Check Foods', async () => {
    await act(async () => {
      renderWithContext(<Foods />);
    });
    hasFooter();
  });

  it('Check Explore', async () => {
    await act(async () => {
      renderWithContext(<Explore />);
    });
    checkID('explore-foods');
  });

  it('Check Explore Foods', async () => {
    await act(async () => {
      renderWithContext(<ExploreFoods />);
    });
    checkID('explore-by-ingredient');
    checkID('explore-by-nationality');
    checkID(EXPLORE_SURPRISE);
  });

  it('Check Drinks', async () => {
    await act(async () => {
      renderWithContext(<Drinks />);
    });
    hasFooter();
  });

  it('Check Explore Drinks', async () => {
    await act(async () => {
      renderWithContext(<ExploreDrinks />);
    });
    checkID('explore-by-ingredient');
    checkID(EXPLORE_SURPRISE);
  });

  it('Check Profile', async () => {
    await act(async () => {
      renderWithContext(<Profile />);
    });

    checkID('page-title');
    checkID('profile-email');
    checkID('profile-done-btn');
    checkID('profile-logout-btn');
  });

  it('Check Done recipes', async () => {
    await act(async () => {
      renderWithContext(<DoneRecipes />);
    });

    hasNoFooter();

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Check Favorite recipes', async () => {
    await act(async () => {
      renderWithContext(<FavoriteRecipes />);
    });

    hasNoFooter();

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });
});
