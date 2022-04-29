import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFoodContext from './AppFoodContext';
import drinksAPI from '../services/drinksApi';
import foodAPI from '../services/foodApi';
import linkApi from '../services/linkApi';
import filterApi from '../services/filterApi';

function AppFoodProvider({ children }) {
  const [emailLogin, setEmailLogin] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [foodCountry, setFoodCountry] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkIngredients, setDrinksIngredients] = useState([]);
  // const [drinkGlasses, setDrinkGlasses] = useState([]);
  const [recipeFoods, setRecipeFoods] = useState([]);
  const [recipeDrinks, setRecipeDrinks] = useState([]);
  const [categoryClick, setCategoryClick] = useState({ categorie: '', type: '' });
  const [categoryArr, setCategoryArr] = useState([]);

  useEffect(() => {
    // async function apiRequest() {
    //   setFoodCategories(await foodAPI('c'));
    //   setFoodIngredients(await foodAPI('i'));
    //   setFoodCountry(await foodAPI('a'));
    //   setDrinkCategories(await drinksAPI('c'));
    //   setDrinksIngredients(await drinksAPI('i'));
    //   setDrinkGlasses(await drinksAPI('g'));
    //   // setAlcoholicDrinks(await drinksAPI('a'));
    //   setRecipeFoods(await linkApi('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    //   // setRecipeDrinks(await linkApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    // }
    foodAPI('c').then((e) => setFoodCategories(e.meals));
    foodAPI('i').then((e) => setFoodIngredients(e.meals));
    foodAPI('a').then((e) => setFoodCountry(e.meals));
    drinksAPI('c').then((e) => setDrinkCategories(e.drinks));
    drinksAPI('i').then((e) => setDrinksIngredients(e.drinks));
    // drinksAPI('g').then((e) => setDrinkGlasses(e.drinks));
    linkApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((e) => setRecipeDrinks(e.drinks));
    linkApi('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((e) => setRecipeFoods(e.meals));
    // apiRequest();
  }, []);

  useEffect(() => {
    console.log(`${categoryClick} useEffect`);
    filterApi(categoryClick).then((e) => setCategoryArr(e));
  }, [categoryClick]);

  const stateValue = {
    emailLogin,
    setEmailLogin,
    foodCategories,
    foodIngredients,
    foodCountry,
    drinkCategories,
    drinkIngredients,
    // drinkGlasses,
    recipeFoods,
    recipeDrinks,
    categoryClick,
    setCategoryClick,
    categoryArr,
    setCategoryArr,
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
