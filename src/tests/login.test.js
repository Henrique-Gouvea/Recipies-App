import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';
import renderWithContext from '../renderWithContext';
import App from '../App';

describe('Login tests', () => {
  beforeEach(async () => {
    await act(async () => renderWithContext(<App />));
  });

  afterEach(cleanup);

  it('Check screen elements', () => {
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });
});
