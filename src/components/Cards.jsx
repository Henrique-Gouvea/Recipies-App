import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppFoodContext from '../context/AppFoodContext';

function Cards({ FoodOrDrink }) {
  const { categoryClick } = useContext(AppFoodContext);
  const numberMaxCards = 12;

  return (
    <>
      <p>.</p>
      {FoodOrDrink
      && FoodOrDrink
        .filter((ForD) => (
          categoryClick ? ForD.strCategory === categoryClick : ForD
        ))
        .map((ForD, index) => (
          <div key={ ForD.idMeal || ForD.idDrink }>
            <p data-testid={ `${index}-card-name` }>
              { ForD.strMeal || ForD.strDrink }
            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ ForD.strMealThumb || ForD.strDrinkThumb }
              alt={ ForD.strMeal || ForD.strDrink }
            />
            <p data-testid={ `${index}-recipe-card` }>
              {ForD.strInstructions}
            </p>
          </div>
        )).slice(0, numberMaxCards)}
    </>
  );
}

Cards.propTypes = {
  FoodOrDrink: PropTypes.string,
}.isRequired;

export default Cards;
