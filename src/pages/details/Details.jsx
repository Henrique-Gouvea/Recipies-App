import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import apiRequestByLink from '../../services/apiRequestByLink';
import Recommendeds from './Recommendeds';
import AppFoodContext from '../../context/AppFoodContext';
import Buttons from './Buttons';
import DetailsInfo from './DetailsInfo';
import Ingredients from './Ingredients';
import Video from './Video';
import { storageObj } from '../../services/utilities';
import './Details.css';

function FoodDetails() {
  const { recipeFoods, recipeDrinks } = useContext(AppFoodContext);
  const [details, setDetails] = useState('');
  const [recommendeds, setRecommendeds] = useState('');
  const [finished, setFinished] = useState(false);
  const [progressItem, setProgressItem] = useState(false);
  const [progress, setProgress] = useState(JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ) || {
    meals: {},
    cocktails: {},
  });
  const history = useHistory();
  const path = `${history.location.pathname}/in-progress`;
  const option = history.location.pathname.replace(/[^a-zA-Z]+/g, '');
  const ForD = option.includes('foods') ? 'meals' : 'cocktails';
  const { id } = useParams();
  const SIX = 6;

  useEffect(() => {
    (async () => {
      const foodData = await apiRequestByLink(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const drinkData = await apiRequestByLink(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      switch (true) {
      case option.includes('foods'):
        setDetails(foodData.meals[0]);
        setRecommendeds(recipeDrinks.slice(0, SIX));
        break;
      default:
        setDetails(drinkData.drinks[0]);
        setRecommendeds(recipeFoods.slice(0, SIX));
      }
    })();
  }, [id, option, recipeDrinks, recipeFoods, setDetails]);

  useEffect(() => {
    if (progress && progress[ForD][id]) {
      setProgressItem(true);
    }
  }, [ForD, id, progress]);

  function finishRecipe() {
    const getDones = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...getDones, { ...storageObj(details, option),
        doneDate: new Date().toLocaleDateString(),
        tags: details.strTags.split(',') }],
    ));// precisei alterar o formato da tag
    history.push('/done-recipes');
  }

  const data = {
    details,
    id,
    option,
    ForD,
    recommendeds,
    progress,
    setProgress,
    setFinished };

  return (
    <main>
      { details
        && (
          <div>
            <DetailsInfo value={ data } />

            <Buttons value={ data } />

            {option.length <= SIX
              ? (
                <div>
                  <Ingredients value={ data } testid />
                  <Video value={ data } />
                  <Recommendeds value={ data } />
                  <button
                    className="recipe-btn"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ () => history.push(path) }
                  >
                    {!progressItem ? 'Start Recipe' : 'Continue Recipe'}
                  </button>
                </div>)
              : (
                <div>
                  <Ingredients value={ data } />
                  <button
                    className="recipe-btn"
                    type="button"
                    data-testid="finish-recipe-btn"
                    onClick={ finishRecipe }
                    disabled={ !finished }
                  >
                    Finish Recipe
                  </button>
                </div>)}
          </div>
        )}
    </main>
  );
}

export default FoodDetails;
