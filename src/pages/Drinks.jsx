import React, { useContext } from 'react';
import ButtonCategory from '../components/ButtonCategory';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';
import Cards from '../components/Cards';
// import linkApi from '../services/linkApi';

function Drinks() {
  const { recipeDrinks, drinkCategories } = useContext(AppFoodContext);

  return (
    <>
      <Header title="Drinks" btnSearch />
      {recipeDrinks ? <Cards FoodOrDrink={ recipeDrinks } /> : ''}
      <ButtonCategory categories={ drinkCategories } />
    </>
  );
}

export default Drinks;
