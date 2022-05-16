import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const PATH_FOODS = '/foods';
const PATH_DRINKS = '/drinks';

describe('SearchBar for foods', () => { // OK!
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
  it('Check SearchBtn in SearchBar for foods', () => { // OK!
    const { history } = renderWithContext(<App />);
    history.push(PATH_FOODS);
    const search = screen.getAllByRole('button')[1];
    fireEvent.click(search);
    const xablau = screen.getByText('xablau');
    const SearchBtn = expect(screen.getAllByRole('button')[2]);
    fireEvent.click(SearchBtn);
    expect(screen.getByRole('alertdialog').toHaveBeenCalled());
  });
});
