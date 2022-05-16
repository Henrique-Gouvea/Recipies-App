import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './renderWithContext';
import App from '../App';
import Login from '../pages/Login';
// import SearchFilter from '../components/SearchFilter';

const PROFILE_ID = 'profile-top-btn';
const TITLE_ID = 'page-title';
const SEARCH_ID = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const PATH = '/foods';

describe('Header tests', () => {
  afterEach(cleanup);

  const hasHeader = async (title, withSearchButton) => {
    expect(await screen.findByTestId(PROFILE_ID)).toBeInTheDocument();
    expect(await screen.findByTestId(TITLE_ID)).toBeInTheDocument();
    expect(await screen.findByTestId(PROFILE_ID))
      .toHaveAttribute('src', 'profileIcon.svg');
    expect(screen.getByTestId(TITLE_ID).textContent).toBe(title);

    if (withSearchButton) {
      expect(await screen.queryByTestId(SEARCH_ID)).toBeNull();
    } else {
      expect(await screen.findByTestId(SEARCH_ID))
        .toHaveAttribute('src', 'searchIcon.svg');
    }
  };

  const hasNoHeader = async () => {
    expect(await screen.queryByTestId(PROFILE_ID)).toBeNull();
    expect(await screen.queryByTestId(TITLE_ID)).toBeNull();
    expect(await screen.queryByTestId(SEARCH_ID)).toBeNull();
  };

  it('Check Login screen hasNoHeader', async () => {
    renderWithContext(<Login />);
    await hasNoHeader();
  });

  it('Check Foods screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    await hasHeader('Foods');
  });

  it('Check Foods screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks');

    await hasHeader('Drinks');
  });

  it('Check Foods details screen hasNoHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods/52771');

    await hasNoHeader();
  });

  it('Check Drinks details screen hasNoHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks/178319');

    await hasNoHeader();
  });

  it('Check Foods in progress screen hasNoHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods/52771/in-progress');

    await hasNoHeader();
  });

  it('Check Drinks in progress screen hasNoHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/drinks/178319/in-progress');

    await hasNoHeader();
  });

  it('Check Explore screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore');

    await hasHeader('Explore', true);
  });

  it('Check Explore foods screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/foods');

    await hasHeader('Explore Foods', true);
  });

  it('Check Explore drinks screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/drinks');

    await hasHeader('Explore Drinks', true);
  });

  it('Check Explore foods ingredients screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/foods/ingredients');

    await hasHeader('Explore Ingredients', true);
  });

  it('Check Explore drinks ingredients screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/drinks/ingredients');

    await hasHeader('Explore Ingredients', true);
  });

  it('Check Explore nationalities screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/explore/foods/nationalities');

    await hasHeader('Explore Nationalities');
  });

  it('Check Profile screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/profile');

    await hasHeader('Profile', true);
  });

  it('Check Done recipes screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/done-recipes');

    await hasHeader('Done Recipes', true);
  });

  it('Check Favorite recipes screen hasHeader', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/favorite-recipes');

    await hasHeader('Favorite Recipes', true);
  });

  // it('Check search filter func', async () => {
  //   const { history } = renderWithContext(<App />);
  //   history.push('/foods');
  //   const searchBtn = await screen.findByTestId(SEARCH_ID);
  //   fireEvent.click(searchBtn);
  //   const searchFilter = await screen.findByTestId('exec-search-btn');

  //   fireEvent.click(searchFilter);
  //   expect(SearchFilter()).toHaveBeenCalled();
  // });

  it('Test header buttons', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    const btn = await screen.findByTestId(PROFILE_ID);
    const searchBtn = await screen.findByTestId(SEARCH_ID);

    expect(await screen.queryByTestId(SEARCH_INPUT)).toBeNull();
    fireEvent.click(searchBtn);
    expect(await screen.findByTestId(SEARCH_INPUT)).toBeInTheDocument();
    fireEvent.click(searchBtn);
    expect(await screen.queryByTestId(SEARCH_INPUT)).toBeNull();

    fireEvent.click(btn);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Test handleChange function', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods');
    const searchBtn = await screen.findByTestId(SEARCH_ID);
    fireEvent.click(searchBtn);
    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'Corba');
    expect(inputSearch.value).toBe('Corba');

    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);
    expect(ingredientRadio.value).toBe('on');
  });
});
