import React, { useState, useEffect } from 'react';
import { arrayOf, shape } from 'prop-types';
import { measure } from '../../services/utilities';
import SaveProgress from '../../components/SaveProgress';

function Ingredients({ value, testid }) {
  const { details, id, progress, option } = value;
  const dataTest = testid ? '-ingredient-name-and-measure' : '-ingredient-step';
  const ForD = option === 'foodsinprogress' ? 'meals' : 'cocktails';
  const [checkedList, setCheckedList] = useState([]);

  useEffect(() => {
    (() => {
      setCheckedList(progress[ForD][id]);
    })();
  }, [ForD, id, progress]);

  function checkCheckbox(i) {
    return checkedList ? checkedList.includes(details[i]) : false;
  }

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
                      onChange={ (e) => SaveProgress(value, ForD, e) }
                      checked={ checkCheckbox(ingredient) }
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
