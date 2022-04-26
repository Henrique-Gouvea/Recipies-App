import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppFoodContext from './AppFoodContext';

function AppFoodProvider({ children }) {
  const [emailLogin, setEmailLogin] = useState({ email: '' });

  const stateValue = {
    emailLogin,
    setEmailLogin,
  };

  return (
    <AppFoodContext.Provider value={ stateValue }>
      {children}
    </AppFoodContext.Provider>

  );
}

AppFoodProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppFoodProvider;
