import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import AppFoodContext from '../../context/AppFoodContext';
import IngredientsCard from './IngredientsCard';

function IngredientsFoods() {
  const { foodIngredients } = useContext(AppFoodContext);

  return (
    <>
      <Header title="Explore Ingredients" />
      <IngredientsCard FoodOrDrink={ foodIngredients } food />
      <h1>IngredientsFoods</h1>
      <Footer />
    </>
  );
}

export default IngredientsFoods;
