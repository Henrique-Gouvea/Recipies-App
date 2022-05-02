import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apiRequestByLink from '../../services/apiRequestByLink';
import Recommendeds from './Recommendeds';
import AppFoodContext from '../../context/AppFoodContext';
import Buttons from './Buttons';
import DetailsInfo from './DetailsInfo';
import Ingredients from './Ingredients';
import Video from './Video';
import './Details.css';

function FoodDetails() {
  const { recipeFoods, recipeDrinks } = useContext(AppFoodContext);
  const [details, setDetails] = useState('');
  const [recommendeds, setRecommendeds] = useState('');
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const path = `${history.location.pathname}/in-progress`;
  const option = history.location.pathname.replace(/[^a-zA-Z]+/g, '');
  const ID = history.location.pathname.replace(/\D/g, '');
  const SIX = 6;

  console.log(option);

  useEffect(() => {
    (async () => {
      const foodData = await apiRequestByLink(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`,
      );
      const drinkData = await apiRequestByLink(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`,
      );

      switch (true) {
      case option === 'foods' || option === 'foodsinprogress':
        setDetails(foodData.meals[0]);
        setRecommendeds(recipeDrinks.slice(0, SIX));
        break;
      default:
        setDetails(drinkData.drinks[0]);
        setRecommendeds(recipeFoods.slice(0, SIX));
      }
    })();
  }, [ID, option, recipeDrinks, recipeFoods, setDetails]);

  useEffect(() => {
    (() => {
      const getProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ForD = option === 'foods' ? 'meals' : 'cocktails';
      if (getProgress && getProgress[ForD][ID]) {
        setProgress(true);
      }
    })();
  }, [ID, option]);

  const data = { details, ID, option, recommendeds };

  return (
    <div>
      { details
        && (
          <>
            <DetailsInfo value={ data } />

            <Buttons value={ data } />

            {option.length <= SIX
              ? (
                <>
                  <Ingredients value={ data } testid />
                  <Video value={ data } />
                  <Recommendeds value={ data } />
                  <button
                    className="recipe-btn"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ () => history.push(path) }
                  >
                    {!progress ? 'Start Recipe' : 'Continue Recipe'}
                  </button>
                </>)
              : (
                <>
                  <Ingredients value={ data } />
                  <button
                    className="recipe-btn"
                    type="button"
                    data-testid="finish-recipe-btn"
                  >
                    Finish Recipe
                  </button>
                </>)}
          </>
        )}
    </div>
  );
}

export default FoodDetails;
