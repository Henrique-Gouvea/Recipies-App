import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './renderWithContext';
import App from '../App';
// import SearchFilter from '../components/SearchFilter';
const PATH_FOODS = '/foods';
const PATH_DRINKS = '/drinks';
const SEARCH_ID = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_BTN = 'exec-search-btn';

describe('SearchFilter tests', () => {
  afterEach(cleanup);

  const globalAlertMock = jest.spyOn(window, 'alert').mockImplementation();

  // it('Check SearchFilter func', async () => {
  //   SearchFilter();
  // });

  it('Check TextBox', () => { // OK!
    const { history } = renderWithContext(<App />);
    history.push(PATH_FOODS);
    const search = screen.getAllByRole('button')[1];
    fireEvent.click(search);
    expect(screen.getByRole('textbox', {
      name: /SearchBar/i })).toBeInTheDocument();
  });
  it('Check radio itens for foods', () => { // OK!
    const { history } = renderWithContext(<App />);
    history.push(PATH_FOODS);
    const search = screen.getAllByRole('button')[1];
    fireEvent.click(search);
    expect(screen.getByRole('radio', {
      name: /ingredient/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /first letter/i })).toBeInTheDocument();
  });
  it('Check SearchBtn in SearchBar for foods', () => { // OK!
    const { history } = renderWithContext(<App />);
    history.push(PATH_FOODS);
    const search = screen.getAllByRole('button')[1];
    fireEvent.click(search);
    expect(screen.getAllByRole('button')[2]).toBeInTheDocument();
  });
  it('Check TextBox for drinks', () => { // OK!
    const { history } = renderWithContext(<App />);
    history.push(PATH_DRINKS);
    const search = screen.getAllByRole('button')[1];
    fireEvent.click(search);
    expect(screen.getByRole('textbox', {
      name: /SearchBar/i })).toBeInTheDocument();
  });
  it('Check radio itens for drinks', () => { // OK!
    const { history } = renderWithContext(<App />);
    history.push(PATH_DRINKS);
    const search = screen.getAllByRole('button')[1];
    fireEvent.click(search);
    expect(screen.getByRole('radio', {
      name: /ingredient/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /first letter/i })).toBeInTheDocument();
  });
  it('Check SearchBtn in SearchBar for drinks', () => { // OK!
    const { history } = renderWithContext(<App />);
    history.push(PATH_DRINKS);
    const search = screen.getAllByRole('button')[1];
    fireEvent.click(search);
    expect(screen.getAllByRole('button')[2]).toBeInTheDocument();
  });

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
