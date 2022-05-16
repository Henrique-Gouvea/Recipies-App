import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import AppFoodContext from '../../context/AppFoodContext';
import IngredientsCard from './IngredientsCard';

function IngredientsDrinks() {
  const { drinkIngredients } = useContext(AppFoodContext);
  // const history = useHistory();

  return (
    <>
      <Header title="Explore Ingredients" />
      {/* <h1>Ingredients Drinks</h1> */}
      <div
        aria-hidden="true"
        // onClick={ history.push() }
      >
        <IngredientsCard FoodOrDrink={ drinkIngredients } />
      </div>
      <Footer />
    </>
  );
}

export default IngredientsDrinks;
