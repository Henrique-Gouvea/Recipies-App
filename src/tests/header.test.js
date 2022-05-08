import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Foods from '../pages/Foods';

const PROFILE_ID = 'profile-top-btn';
const TITLE_ID = 'page-title';
const SEARCH_ID = 'search-top-btn';

describe('Header tests', () => {
  beforeEach(async () => {
    await act(async () => renderWithContext(<Foods />));
  });

  afterEach(cleanup);

  it('Check screen elements', () => {
    expect(screen.getByTestId(PROFILE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TITLE_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_ID)).toBeInTheDocument();
  });
});
