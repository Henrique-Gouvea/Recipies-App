import React, { useContext } from 'react';

function Login() {
  return (
    <label htmlFor="email-input">
      E-mail
      <input
        data-testid="email-input"
        name="email-input"
        // onChange={}
        value=""
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
