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

  it('Check screen elements', () => {
    renderWithContext(<Foods />);
    expect(screen.getByTestId(PROFILE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TITLE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_ID)).toBeInTheDocument();
  });

  it('Test buttons', () => {
    const { history } = renderWithContext(<Foods />);
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
