import React, { useContext } from 'react';
import AppFoodContext from '../context/AppFoodContext';

function Login() {
  const {
    emailLogin,
    setEmailLogin,
  } = useContext(AppFoodContext);

  return (
    <label htmlFor="email-input">
      E-mail
      <input
        data-testid="email-input"
        name="email-input"
        onChange={ (ele) => setEmailLogin({
          emailLogin: ele.target.value,
        }) }
        value={ emailLogin.email }
      />
      <input
        data-testid="password-input"
        name="password-input"
        // onChange={}
        value=""
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
      >
        Enter
      </button>
    </label>
  );
}

export default Login;
