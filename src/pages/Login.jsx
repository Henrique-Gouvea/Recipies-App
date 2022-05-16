import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppFoodContext from '../context/AppFoodContext';

function Login() {
  const history = useHistory();
  const {
    emailLogin,
    setEmailLogin,
  } = useContext(AppFoodContext);

  const [password, setPassword] = useState('');

  const checkBtn = () => {
    const min = 6;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = regexEmail.test(emailLogin);
    if ((password.length > min && validEmail)) {
      return false;
    }
    return true;
  };

  const btnSubmit = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: emailLogin }));
    history.push('/foods');
  };

  return (
    <label htmlFor="email-input">
      E-mail
      <input
        data-testid="email-input"
        name="email-input"
        type="email"
        onChange={ (ele) => setEmailLogin(
          ele.target.value,
        ) }
        value={ emailLogin }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password-input"
        onChange={ (ele) => setPassword(
          ele.target.value,
        ) }
        value={ password }
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ checkBtn() }
        onClick={ () => btnSubmit() }
      >
        Enter
      </button>
    </label>
  );
}

export default Login;
