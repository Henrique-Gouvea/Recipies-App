import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Nationalities from '../pages/Nationalities';

describe('Explore nationalities tests', () => {
  afterEach(cleanup);

  it('Check screen elements', async () => {
    renderWithContext(<Nationalities />);
    const twelve = 12;
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();

    for (let index = 0; index < twelve; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    expect(await screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(await screen.queryByTestId('12-card-img')).toBeNull();
    expect(await screen.queryByTestId('12-card-name')).toBeNull();
  });

  it('Check select options', async () => {
    renderWithContext(<Nationalities />);
    const dropdown = screen.getByTestId('explore-by-nationality-dropdown');
    expect(dropdown).toBeInTheDocument();
  });
});
