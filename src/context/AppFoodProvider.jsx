import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFoodContext from './AppFoodContext';
import drinksAPI from '../services/drinksApi';
import foodAPI from '../services/foodApi';

function AppFoodProvider({ children }) {
  const [emailLogin, setEmailLogin] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [foodCountry, setFoodCountry] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkIngredients, setDrinksIngredients] = useState([]);
  const [drinkGlasses, setDrinkGlasses] = useState([]);
  const [alcoholicDrinks, setAlcoholicDrinks] = useState([]);

  useEffect(() => {
    async function apiRequest() {
      await setFoodCategories(await foodAPI('c'));
      await setFoodIngredients(await foodAPI('i'));
      await setFoodCountry(await foodAPI('a'));
      await setDrinkCategories(await drinksAPI('c'));
      await setDrinksIngredients(await drinksAPI('i'));
      await setDrinkGlasses(await drinksAPI('g'));
      await setAlcoholicDrinks(await drinksAPI('a'));
    }
    apiRequest();
  }, []);

  console.log(drinkGlasses);

  const stateValue = {
    emailLogin,
    setEmailLogin,
    foodCategories,
    foodIngredients,
    foodCountry,
    drinkCategories,
    drinkIngredients,
    drinkGlasses,
    alcoholicDrinks,
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
