import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiRequestByLink from '../../services/apiRequestByLink';

function FoodDetails() {
  const [foodDetails, setFoodDetails] = useState('');
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const id = history.location.pathname.replace(/\D/g, '');
      const LINK = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setFoodDetails(await apiRequestByLink(LINK));
    })();
  }, [history.location.pathname, setFoodDetails]);

  return (
    <div>
      { foodDetails
        && (
          <>
            <h2 data-testid="recipe-title">{foodDetails.meals[0].strMeal}</h2>
            <img
              data-testid="recipe-photo"
              src={ foodDetails.meals[0].strMealThumb }
              alt={ foodDetails.meals[0].strMeal }
            />
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
            <p data-testid="recipe-category">{foodDetails.meals[0].strCategory}</p>

            <ul>
              { Object.keys(foodDetails.meals[0])
                .filter((item) => item.includes('strIngredient'))
                .map((ingredient, i) => (
                  foodDetails.meals[0][ingredient]
                    ? (
                      <li
                        key={ i }
                        data-testid={ `${ingredient}-ingredient-name-and-measure` }
                      >
                        { foodDetails.meals[0][ingredient] }
                      </li>
                    ) : null
                ))}
            </ul>
            <p data-testid="instructions">{foodDetails.meals[0].strInstructions}</p>
          </>
        )}
    </div>
  );
}

export default FoodDetails;
