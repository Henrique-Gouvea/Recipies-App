import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppFoodContext from '../../context/AppFoodContext';
import apiRequestByLink from '../../services/apiRequestByLink';

function IngredientsCard({ FoodOrDrink, food }) {
  const numberMaxCards = 12;
  const history = useHistory();
  const { setCategoryArr } = useContext(AppFoodContext);

  async function clickCard({ target: { className } }) {
    let teste = '';
    if (food) {
      teste = await apiRequestByLink(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${className}`);
      setCategoryArr(teste.meals);
      history.push('/foods');
    } else {
      teste = await apiRequestByLink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${className}`);
      setCategoryArr(teste.drinks);
      history.push('/drinks');
    }
  }

  return (
    <>
      {FoodOrDrink && FoodOrDrink.map((ForD, index) => (
        <div
          key={ ForD.strIngredient || ForD.strIngredient1 }
          className={ ForD.strIngredient || ForD.strIngredient1 }
          aria-hidden="true"
          onClick={ clickCard }
        >
          <p
            data-testid={ `${index}-ingredient-card` }
            className={ ForD.strIngredient || ForD.strIngredient1 }
          >
            { index }
          </p>
          <img
            className={ ForD.strIngredient || ForD.strIngredient1 }
            data-testid={ `${index}-card-img` }
            src={ food
              ? `https://www.themealdb.com/images/ingredients/${ForD.strIngredient}-Small.png`
              : `https://www.thecocktaildb.com/images/ingredients/${ForD.strIngredient1}-Small.png` }
            alt={ ForD.strIngredient || ForD.strIngredient1 }
          />
          <p
            className={ ForD.strIngredient || ForD.strIngredient1 }
            data-testid={ `${index}-card-name` }
          >
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
