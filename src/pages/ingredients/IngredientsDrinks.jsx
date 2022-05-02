import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import AppFoodContext from '../../context/AppFoodContext';
import IngredientsCard from './IngredientsCard';

function IngredientsDrinks() {
  const { drinkIngredients } = useContext(AppFoodContext);

  return (
    <>
      <Header title="Explore Ingredients" />
      <IngredientsCard FoodOrDrink={ drinkIngredients } />
      <h1>IngredientsDrinks</h1>
      <Footer />
    </>
  );
}

export default IngredientsDrinks;
