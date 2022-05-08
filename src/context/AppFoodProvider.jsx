import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFoodContext from './AppFoodContext';
import drinksAPI from '../services/drinksApi';
import foodAPI from '../services/foodApi';
import apiRequestByLink from '../services/apiRequestByLink';
import filterApi from '../services/filterApi';

function AppFoodProvider({ children }) {
  const [emailLogin, setEmailLogin] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [foodCountry, setFoodCountry] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkIngredients, setDrinksIngredients] = useState([]);
  const [recipeFoods, setRecipeFoods] = useState([]);
  const [recipeDrinks, setRecipeDrinks] = useState([]);
  const [categoryClick, setCategoryClick] = useState({ categorie: '', type: '' });
  const [categoryArr, setCategoryArr] = useState([]);
  const [radioValue, setRadioValue] = useState('');
  const [nationaliteSelected, setNationaliteSelected] = useState('All');
  const [nationaliteArr, setNationaliteArr] = useState('');

  useEffect(() => {
    const option = window.location.href.split('/')[3];
    if ((radioValue && !recipeFoods) || (radioValue && !recipeDrinks)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (recipeFoods.length === 1 || recipeDrinks.length === 1) {
      window.location.href = (
        option === 'foods' ? `/${option}/${recipeFoods[0]?.idMeal}`
          : `/${option}/${recipeDrinks[0]?.idDrink}`);
    }
  }, [recipeFoods, recipeDrinks, radioValue]);

  useEffect(() => {
    foodAPI('c').then((e) => setFoodCategories(e.meals));
    foodAPI('i').then((e) => setFoodIngredients(e.meals));
    foodAPI('a').then((e) => setFoodCountry(e.meals));
    drinksAPI('c').then((e) => setDrinkCategories(e.drinks));
    drinksAPI('i').then((e) => setDrinksIngredients(e.drinks));
    apiRequestByLink('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((e) => {
        setRecipeDrinks(e.drinks);
        setNationaliteArr(e);
      });
    apiRequestByLink('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((e) => setRecipeFoods(e.meals));
  }, []);

  useEffect(() => {
    filterApi(categoryClick).then((e) => setCategoryArr(e));
  }, [categoryClick]);

  const stateValue = {
    emailLogin,
    setEmailLogin,
    setRadioValue,
    setRecipeFoods,
    setRecipeDrinks,
    radioValue,
    foodCategories,
    foodIngredients,
    foodCountry,
    drinkCategories,
    drinkIngredients,
    recipeFoods,
    recipeDrinks,
    categoryClick,
    setCategoryClick,
    categoryArr,
    setCategoryArr,
    nationaliteSelected,
    setNationaliteSelected,
    nationaliteArr,
    setNationaliteArr,
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
