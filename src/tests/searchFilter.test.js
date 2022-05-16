import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './renderWithContext';
import App from '../App';
// import SearchFilter from '../components/SearchFilter';

const SEARCH_ID = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_BTN = 'exec-search-btn';

describe('SearchFilter tests', () => {
  afterEach(cleanup);

  const globalAlertMock = jest.spyOn(window, 'alert').mockImplementation();

  // it('Check SearchFilter func', async () => {
  //   SearchFilter();
  // });

  it('Test first letter filter alert', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods');

    const searchBtn = await screen.findByTestId(SEARCH_ID);
    fireEvent.click(searchBtn);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'top');

    const fLRadio = await screen.findByTestId('first-letter-search-radio');
    fireEvent.click(fLRadio);

    const execBtn = await screen.findByTestId(EXEC_BTN);
    fireEvent.click(execBtn);
    expect(globalAlertMock).toHaveBeenCalled();
  });

  it('Test first letter filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods');

    const searchBtn = await screen.findByTestId(SEARCH_ID);
    fireEvent.click(searchBtn);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'B');

    const fLRadio = await screen.findByTestId('first-letter-search-radio');
    fireEvent.click(fLRadio);

    const execBtn = await screen.findByTestId(EXEC_BTN);
    fireEvent.click(execBtn);
    expect(await screen.findByText('Bakewell tart')).toBeInTheDocument();
  });

  it('Test ingredient filter', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods');

    const searchBtn = await screen.findByTestId(SEARCH_ID);
    fireEvent.click(searchBtn);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'Thyme');

    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    fireEvent.click(ingredientRadio);

    const execBtn = await screen.findByTestId(EXEC_BTN);
    fireEvent.click(execBtn);
    expect(await screen.findByText('Beef and Mustard Pie')).toBeInTheDocument();
  });

  it('Test name filter alert and redirect', async () => {
    const { history } = renderWithContext(<App />);
    history.push('/foods');

    const searchBtn = await screen.findByTestId(SEARCH_ID);
    fireEvent.click(searchBtn);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'Corba');

    const nameRadio = await screen.findByTestId('name-search-radio');
    fireEvent.click(nameRadio);

    const execBtn = await screen.findByTestId(EXEC_BTN);
    fireEvent.click(execBtn);
    expect(history.location.pathname).toBe('/foods');
  });
});
