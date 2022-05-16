import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AppFoodProvider from '../context/AppFoodProvider';

const renderWithContext = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <AppFoodProvider>
        <Router history={ history }>{component}</Router>
      </AppFoodProvider>,
    ),
    history,
  });
};

export default renderWithContext;
