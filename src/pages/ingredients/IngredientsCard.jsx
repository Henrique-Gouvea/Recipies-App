import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCard({ FoodOrDrink }) {
  console.log(FoodOrDrink);
  const numberMaxCards = 12;
  return (
    <>
      {FoodOrDrink && FoodOrDrink.map((ForD, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-card` }>
            { index }
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ ForD.strMealThumb || ForD.strDrinkThumb }
            alt={ ForD.strMeal || ForD.strDrink }
          />
          <p data-testid={ `${index}-card-name` }>{ ForD.strIngredient }</p>
          <p>s</p>
        </div>
      )).slice(0, numberMaxCards)}
      <p>.</p>
    </>
  );
}

IngredientsCard.propTypes = {
  FoodOrDrink: PropTypes.string,
}.isRequired;

export default IngredientsCard;
