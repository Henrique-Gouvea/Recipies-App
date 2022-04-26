import React, { useContext, useState } from 'react';
import AppFoodContext from '../context/AppFoodContext';

function Login() {
  const {
    emailLogin,
    setEmailLogin,
  } = useContext(AppFoodContext);

  const [password, setPassword] = useState('');
  // const [btnStatus, setBtnStatus] = useState(true);

  function checkBtn() {
    const min = 6;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = regexEmail.test(emailLogin);
    console.log(password);
    if ((password.length > min && validEmail)) {
      console.log('true');
      return false;
    }
    return true;
  }

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
      >
        Enter
      </button>
    </label>
  );
}

export default Login;
