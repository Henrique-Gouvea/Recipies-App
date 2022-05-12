import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Nationalities from '../pages/Nationalities';

describe('Explore nationalities tests', () => {
  afterEach(cleanup);

  async function testCards() {
    expect(await screen.findByTestId('11-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('11-card-img')).toBeInTheDocument();
    expect(await screen.findByTestId('11-card-name')).toBeInTheDocument();
    expect(await screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(await screen.queryByTestId('12-card-img')).toBeNull();
    expect(await screen.queryByTestId('12-card-name')).toBeNull();
  }

  it('Check screen elements', async () => {
    renderWithContext(<Nationalities />);
    testCards();
  });

  it('Check select options', async () => {
    renderWithContext(<Nationalities />);
    const dropdown = screen.getByTestId('explore-by-nationality-dropdown');
    expect(dropdown).toBeInTheDocument();
  });
});
