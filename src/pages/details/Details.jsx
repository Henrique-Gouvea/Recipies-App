import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiRequestByLink from '../../services/apiRequestByLink';
import Recommendeds from './Recommendeds';
import './Details.css';

function FoodDetails() {
  const [details, setDetails] = useState('');
  const [recommendeds, setRecommendeds] = useState('');
  const history = useHistory();
  const option = history.location.pathname.replace(/[^a-zA-Z]+/g, '');
  const ID = history.location.pathname.replace(/\D/g, '');

  useEffect(() => {
    (async () => {
      const foodData = await apiRequestByLink(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`,
      );
      const drinkData = await apiRequestByLink(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`,
      );
      const recFoods = await apiRequestByLink(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const recDrinks = await apiRequestByLink(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const SIX = 6;

      switch (option) {
      case 'foods':
        setDetails(foodData.meals[0]);
        setRecommendeds(recDrinks.drinks.slice(0, SIX));
        break;
      default:
        setDetails(drinkData.drinks[0]);
        setRecommendeds(recFoods.meals.slice(0, SIX));
      }
    })();
  }, [ID, option, setDetails]);

  function getVideoID(url) {
    return url.split(/(v=|youtu\.be\/)/)[2];
  }

  function measure(index) {
    const measureIndex = `${details[`strMeasure${index + 1}`]}`;
    return measureIndex !== 'null' ? ` - ${measureIndex}` : '';
  }

  return (
    <div>
      { details
        && (
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
            <button
              data-testid="share-btn"
              type="button"
            >
              Share
            </button>
            <button
              data-testid="favorite-btn"
              type="button"
            >
              Favorite
            </button>

            <ul>
              { Object.keys(details)
                .filter((item) => item.includes('strIngredient'))
                .map((ingredient, i) => (
                  details[ingredient]
                    ? (
                      <li
                        key={ i }
                        data-testid={ `${i}-ingredient-name-and-measure` }
                      >
                        { `${details[ingredient]} ${measure(i)}` }
                      </li>
                    ) : null
                ))}
            </ul>
            <p data-testid="instructions">{details.strInstructions}</p>
            { details.strMeal
              && (
                <iframe
                  data-testid="video"
                  width="360"
                  src={ `https://www.youtube.com/embed/${getVideoID(details.strYoutube)}` }
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
              )}
            <Recommendeds recommendeds={ recommendeds } />
          </>
        )}
    </div>
  );
}

export default FoodDetails;
