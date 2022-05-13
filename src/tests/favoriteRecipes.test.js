import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';

describe('Header tests', () => {
  afterEach(cleanup);

  it('Check screen elements', async () => {
    const { history } = renderWithContext(<App />);
    history.push(FOOD_PATH);
    await screen.findAllByText('Foods');
    expect(screen.getByTestId(PROFILE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TITLE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_ID)).toBeInTheDocument();
  });
});
