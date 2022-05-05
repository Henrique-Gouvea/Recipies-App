import React from 'react';
import { arrayOf, shape } from 'prop-types';

function DetailsInfo({ value }) {
  const { details } = value;
  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb || details.strDrinkThumb }
        alt={ details.strMeal || details.strDrink }
      />
      <h2 data-testid="recipe-title">{details.strMeal || details.strDrink}</h2>
      <p
        data-testid="recipe-category"
      >
        {details.strAlcoholic || details.strCategory}
      </p>
    </>
  );
}

DetailsInfo.propTypes = {
  value: arrayOf(shape()),
}.isRequired;

export default DetailsInfo;
