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
          .map((ingredient, i) => {
            if (details[ingredient]) {
              return testid
                ? (
                  <li
                    key={ i }
                    data-testid={ `${i}${dataTest}` }
                  >
                    { `${details[ingredient]} ${measure(i, details)}` }
                  </li>
                ) : (
                  <label
                    key={ i }
                    htmlFor={ `input-${i}` }
                    data-testid={ `${i}${dataTest}` }
                    className="checkbox"
                  >
                    <input
                      id={ `input-${i}` }
                      type="checkbox"
                      value="v"
                    />
                    { `${details[ingredient]} ${measure(i, details)}` }
                  </label>
                );
            }
            return null;
          })}
      </ul>
      <p data-testid="instructions">{details.strInstructions}</p>
    </>
  );
}

Ingredients.propTypes = {
  value: arrayOf(shape()),
}.isRequired;

export default Ingredients;
