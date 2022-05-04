import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import apiRequestByLink from '../../services/apiRequestByLink';

function ButtonsExplore({ food }) {
  const history = useHistory();

  function clickExploreIngredient() {
    if (food) {
      history.push('/explore/foods/ingredients');
    } else history.push('/explore/drinks/ingredients');
  }

  function clickExploreNationality() {
    if (food) {
      history.push('/explore/foods/nationalities');
    } else history.push('/explore/drinks/nationalities');
  }

  async function clickSurprise() {
    let idAleatoria = '';
    if (food) {
      idAleatoria = await apiRequestByLink('https://www.themealdb.com/api/json/v1/1/random.php');
      history.push(`/foods/${idAleatoria.meals[0].idMeal}`);
    } else {
      idAleatoria = await apiRequestByLink('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      history.push(`/drinks/${idAleatoria.drinks[0].idDrink}`);
    }
  }

  return (
    <>
      <button
        type="submit"
        data-testid="explore-by-ingredient"
        onClick={ clickExploreIngredient }
      >
        By Ingredient
      </button>
      {food
        ? (
          <button
            type="submit"
            data-testid="explore-by-nationality"
            onClick={ clickExploreNationality }
          >
            By Nationality
          </button>)
        : ''}
      <button
        type="submit"
        data-testid="explore-surprise"
        onClick={ clickSurprise }
      >
        Surprise me!
      </button>
    </>
  );
}

ButtonsExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ButtonsExplore;
