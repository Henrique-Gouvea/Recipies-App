import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { measure } from '../../services/utilities';
import SaveProgress from '../../components/SaveProgress';

function Ingredients({ value, testid }) {
  const { details } = value;
  const dataTest = testid ? '-ingredient-name-and-measure' : '-ingredient-step';

  return (
    <section>
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
                      value={ details[ingredient] }
                      onChange={ (e) => SaveProgress(value, e) }
                    />
                    { `${details[ingredient]} ${measure(i, details)}` }
                  </label>
                );
            }
            return null;
          })}
      </ul>
      <p data-testid="instructions">{details.strInstructions}</p>
    </section>
  );
}

Ingredients.propTypes = {
  value: arrayOf(shape()),
}.isRequired;

export default Ingredients;
