import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { measure } from '../../services/utilities';

function Ingredients({ value, testid }) {
  const { details } = value;
  const dataTest = testid ? '-ingredient-name-and-measure' : '-ingredient-step';
  return (
    <>
      <ul>
        { Object.keys(details)
          .filter((item) => item.includes('strIngredient'))
          .map((ingredient, i) => (
            details[ingredient]
              ? (
                <li
                  key={ i }
                  data-testid={ `${i}${dataTest}` }
                >
                  { `${details[ingredient]} ${measure(i, details)}` }
                </li>
              ) : null
          ))}
      </ul>
      <p data-testid="instructions">{details.strInstructions}</p>
    </>
  );
}

Ingredients.propTypes = {
  value: arrayOf(shape()),
}.isRequired;

export default Ingredients;
