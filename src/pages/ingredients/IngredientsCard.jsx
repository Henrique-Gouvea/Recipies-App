import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCard({ FoodOrDrink, food }) {
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
            src={ food
              ? `https://www.themealdb.com/images/ingredients/${ForD.strIngredient}-Small.png`
              : `https://www.thecocktaildb.com/images/ingredients/${ForD.strIngredient1}-Small.png` }
            alt={ ForD.strIngredient || ForD.strIngredient1 }
          />
          <p data-testid={ `${index}-card-name` }>
            { ForD.strIngredient || ForD.strIngredient1 }
          </p>
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
