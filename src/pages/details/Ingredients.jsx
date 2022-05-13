import React, { useState, useEffect, useRef } from 'react';
import { arrayOf, shape } from 'prop-types';
import { measure } from '../../services/utilities';
import SaveProgress from '../../components/SaveProgress';

function Ingredients({ value, testid }) {
  const { details, id, progress, ForD, setFinished } = value;
  const dataTest = testid ? '-ingredient-name-and-measure' : '-ingredient-step';
  const [checkedList, setCheckedList] = useState([]);
  const listItems = useRef();

  useEffect(() => {
    (() => {
      setCheckedList(progress[ForD][id]);
    })();

    setFinished(listItems.current?.children.length === checkedList?.length);
  }, [ForD, checkedList, id, progress, setFinished]);

  function checkCheckbox(i) {
    return checkedList ? checkedList.includes(details[i]) : false;
  }

  return (
    <section>
      <ul ref={ listItems }>
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
                    { `${details[ingredient]}${measure(i, details)}` }
                  </li>
                ) : (
                  <label
                    key={ i }
                    htmlFor={ `input-${i}` }
                    className="checkbox"
                    data-testid={ `${i}${dataTest}` }
                    style={ {
                      textDecoration: checkCheckbox(ingredient) && 'line-through',
                    } }
                  >
                    <input
                      id={ `input-${i}` }
                      type="checkbox"
                      value={ details[ingredient] }
                      defaultChecked={ checkCheckbox(ingredient) }
                      onChange={ (e) => SaveProgress(value, ForD, e) }
                    />
                    { `${details[ingredient]}${measure(i, details)}` }
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
