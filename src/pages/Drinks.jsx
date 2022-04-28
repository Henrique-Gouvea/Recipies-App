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
      {/* {recipeDrinks?.slice(0,12)
      .map((drinks, index) => (
        <div key={ drinks.idDrink }>
          <p data-testid={`${index}-card-name`}>{drinks.strDrink}</p>
          <img data-testid={`${index}-card-img`} src={ drinks.strDrinkThumb } alt={ drinks.strDrink } />
          <p data-testid={`${index}-recipe-card`}>{drinks.strInstructions}</p>
        </div>
      ))} */}
      <ButtonCategory categories={ drinkCategories } />
    </>
  );
}

export default Drinks;
