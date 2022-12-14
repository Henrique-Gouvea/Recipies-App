import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './renderWithContext';
import App from '../App';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const BTN_ID = 'login-submit-btn';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'GROUP13';

describe('Login tests', () => {
  afterEach(cleanup);

  it('Check screen elements', async () => {
    renderWithContext(<App />);
    expect(await screen.findByTestId(EMAIL_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_ID)).toBeInTheDocument();
    expect(screen.getByTestId(BTN_ID)).toBeInTheDocument();
  });

  it('Check valid email, password and button status', async () => {
    renderWithContext(<App />);
    const emailLogin = await screen.findByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const btn = screen.getByTestId(BTN_ID);

    expect(btn.disabled).toBeTruthy();
    userEvent.type(emailLogin, VALID_EMAIL);
    userEvent.type(password, 'five');
    expect(btn.disabled).toBeTruthy();

    userEvent.type(emailLogin, 'email.com');
    userEvent.type(password, VALID_PASSWORD);
    expect(btn.disabled).toBeTruthy();

    userEvent.type(emailLogin, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(btn.disabled).toBeFalsy();

    expect(emailLogin.value).toBe(VALID_EMAIL);
    expect(password.value).toBe(VALID_PASSWORD);
  });

  it('Check localStorage and route', async () => {
    const { history } = renderWithContext(<App />);
    const emailLogin = await screen.findByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const btn = screen.getByTestId(BTN_ID);

    fireEvent.change(emailLogin, { target: { value: VALID_EMAIL } });
    fireEvent.change(password, { target: { value: VALID_PASSWORD } });
    fireEvent.click(btn);

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));
    const user = JSON.parse(localStorage.getItem('user'));

    expect(user.email).toBe(VALID_EMAIL);
    expect(mealsToken).toBe(1);
    expect(cocktailsToken).toBe(1);
    expect(history.location.pathname).toBe('/foods');
  });
});
