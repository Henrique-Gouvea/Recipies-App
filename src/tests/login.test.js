import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from '../renderWithContext';
import App from '../App';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const BTN_ID = 'login-submit-btn';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'GROUP13';

describe('Login tests', () => {
  beforeEach(async () => {
    await act(async () => renderWithContext(<App />));
  });

  afterEach(cleanup);

  it('Check screen elements', () => {
    expect(screen.getByTestId(EMAIL_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_ID)).toBeInTheDocument();
    expect(screen.getByTestId(BTN_ID)).toBeInTheDocument();
  });

  it('Check valid email, password and button status', () => {
    const emailLogin = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const btn = screen.getByTestId(BTN_ID);

    expect(btn.disabled).toBeTruthy();
    userEvent.type(emailLogin, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(btn.disabled).toBeFalsy();

    expect(emailLogin.value).toBe(VALID_EMAIL);
    expect(password.value).toBe(VALID_PASSWORD);
  });
});
