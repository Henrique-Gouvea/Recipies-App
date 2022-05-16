import React from 'react';
import { screen } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const PATH = '/xyz';

describe('1. Teste a page NotFound.', () => {
  it('Teste se página contém um heading h1 com o texto: Opss... Sorry', () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);
    const sorry = screen.getByRole('heading',
      { level: 1, name: /opss\.\.\. sorry/i });
    expect(sorry).toBeInTheDocument();
  });

  it('Teste se página contém um heading h1 com o texto not found', () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);
    const notFoundHeading = screen.getByRole('heading',
      { level: 1, name: /not found/i });
    expect(notFoundHeading).toBeInTheDocument();
  });
});
