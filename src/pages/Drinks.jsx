import React, { useContext } from 'react';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';
// import linkApi from '../services/linkApi';

function Drinks() {
  const { recipeDrinks, drinkCategories } = useContext(AppFoodContext);

  if (recipeDrinks) console.log(recipeDrinks);

  return (
    <>
      <Header title="Drinks" btnSearch />
      <h1>Drinks</h1>
      {recipeDrinks?.slice(0,12)
      .map((drinks, index) => (
        <div key={ drinks.idDrink }>
          <p data-testid={`${index}-card-name`}>{drinks.strDrink}</p>
          <img data-testid={`${index}-card-img`} src={ drinks.strDrinkThumb } alt={ drinks.strDrink } />
          <p data-testid={`${index}-recipe-card`}>{drinks.strInstructions}</p>
        </div>
      ))}
      {drinkCategories?.slice(0,5)
      .map((cat) => (
        <button
          key={ cat.strCategory }
          type="submit"
          data-testid={ `${cat.strCategory}-category-filter` }
        >
          {cat.strCategory}
        </button>
      ))}
    </>
  );
}

export default Drinks;
