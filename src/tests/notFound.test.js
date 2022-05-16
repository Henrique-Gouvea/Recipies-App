import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

const PATH = '/explore/drinks/nationalities';

describe('NotFound tests', () => {
  afterEach(cleanup);

  it('Check NotFound page', async () => {
    const { history } = renderWithContext(<App />);
    history.push(PATH);

    expect(screen.getByText('Opss... Sorry')).toBeInTheDocument();
  });
});
