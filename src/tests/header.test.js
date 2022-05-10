import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Foods from '../pages/Foods';

const PROFILE_ID = 'profile-top-btn';
const TITLE_ID = 'page-title';
const SEARCH_ID = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Header tests', () => {
  afterEach(cleanup);

  it('Check screen elements', async () => {
    renderWithContext(<Foods />);
    await screen.findAllByText('Foods');
    expect(screen.getByTestId(PROFILE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TITLE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_ID)).toBeInTheDocument();
  });

  it('Test header buttons', async () => {
    const { history } = renderWithContext(<Foods />);
    await screen.findAllByText('Foods');

    const btn = screen.getByTestId(PROFILE_ID);
    const searchBtn = screen.getByTestId(SEARCH_ID);

    expect(() => screen.getByTestId(SEARCH_INPUT)).toThrow();
    fireEvent.click(searchBtn);
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    fireEvent.click(searchBtn);
    expect(() => screen.getByTestId(SEARCH_INPUT)).toThrow();

    fireEvent.click(btn);
    expect(history.location.pathname).toBe('/profile');
  });
});
