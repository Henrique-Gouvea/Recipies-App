import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AppFoodContext from '../context/AppFoodContext';

const renderServingContext = (component, value) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <AppFoodContext.Provider value={ value }>
        <Router history={ history }>{component}</Router>
      </AppFoodContext.Provider>,
    ),
    history,
  });
};

export default renderServingContext;
