// import React, { useContext, useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import apiRequestByLink from '../services/apiRequestByLink';
// import AppFoodContext from '../context/AppFoodContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  // const { foodCategories } = useContext(AppFoodContext);
  // console.log(foodCategories);

  const [randomMeal, setRandomMeal] = useState([]);

  useEffect(() => {
    (async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const data = await apiRequestByLink(url);
      setRandomMeal(data.meals);
    })();
  }, []);

  return (
    <>
      <Header title="Done Recipes" />
      <h1>DoneRecipes</h1>
      <div>
        {randomMeal && randomMeal.map((el, index) => (
          <div key={ Math.random() * 100 }>
            <p data-testid={ `${index}-horizontal-name` }>{el.strMeal}</p>
            <img
              src={ el.strMealThumb }
              data-testid={ `${index}-horizontal-image` }
              alt="alt"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{el.strCategory}</p>
            <p
              data-testid={ `${index}-${el.strTags}-horizontal-tag` }
            >
              {el.strTags}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{el.dateModified}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img className="shareIcon" src={ shareIcon } alt="shareIcon" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drinks-btn"
      >
        Drinks
      </button>

    </>
  );
}

export default DoneRecipes;
