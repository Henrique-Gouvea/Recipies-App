import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Profile from '../pages/Profile';

const DONE = 'profile-done-btn';
const FAVORITE = 'profile-favorite-btn';
const LOGOUT = 'profile-logout-btn';

describe('Profile tests', () => {
  beforeEach(() => {
    localStorage.setItem('user', '{ "email": "email@mail.com" }');
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('doneRecipes', '[]');
    localStorage.setItem('favoriteRecipes', '[]');
    localStorage.setItem('inProgressRecipes', '{}');
  });

  afterEach(cleanup);

  it('Check screen elements', async () => {
    renderWithContext(<Profile />);
    expect(await screen.findByTestId('profile-email')).toBeInTheDocument();
    expect(await screen.findByTestId(DONE)).toBeInTheDocument();
    expect(await screen.findByTestId(FAVORITE)).toBeInTheDocument();
    expect(await screen.findByTestId(LOGOUT)).toBeInTheDocument();
  });

  it('Check profile email', async () => {
    renderWithContext(<Profile />);
    const emailCheck = await screen.findByText('{ "email": "email@mail.com" }');
    expect(emailCheck).toBeInTheDocument();
  });

  it('Check profile buttons', async () => {
    const { history } = renderWithContext(<Profile />);

    const doneBtn = await screen.findByTestId(DONE);
    const favoriteBtn = await screen.findByTestId(FAVORITE);
    const logoutBtn = await screen.findByTestId(LOGOUT);

    expect(doneBtn).toHaveValue('Done Recipes');
    fireEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');

    expect(favoriteBtn).toHaveValue('Favorite Recipes');
    fireEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');

    expect(logoutBtn).toHaveValue('Logout');
    fireEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('Test if localStorage is clean', async () => {
    renderWithContext(<Profile />);

    const logoutBtn = await screen.findByTestId(LOGOUT);

    expect(logoutBtn).toHaveValue('Logout');
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('mealsToken')).toBeNull();
    expect(localStorage.getItem('cocktailsToken')).toBeNull();
    expect(localStorage.getItem('doneRecipes')).toBeNull();
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(localStorage.getItem('inProgressRecipes')).toBeNull();
  });
});
