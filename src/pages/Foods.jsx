import React, { useContext } from 'react';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';

function Foods() {
  const {
    foodCategories,
    recipeFoods,
    recipeDrinks,
  } = useContext(AppFoodContext);

  if(recipeFoods) console.log(recipeFoods);

  return (
    <>
      <Header title="Foods" btnSearch />
      {recipeFoods?.slice(0,12)
      .map((meal, index) => (
        <div key={ meal.idMeal }>
          <p data-testid={`${index}-card-name`}>{meal.strMeal}</p>
          <img data-testid={`${index}-card-img`} src={ meal.strMealThumb } alt={ meal.strMeal } />
          <p data-testid={`${index}-recipe-card`}>{meal.strInstructions}</p>
        </div>
      ))}
      {foodCategories?.slice(0,5)
      .map((cat) => (
        <button
          key={ cat.strCategory }
          type="submit"
          data-testid={ `${cat.strCategory}-category-filter` }
        >
          {cat.strCategory}
        </button>
      ))}
    </>
  );
}

export default Foods;
