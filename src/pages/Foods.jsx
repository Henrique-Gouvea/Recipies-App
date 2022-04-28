import React, { useContext } from 'react';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';
import ButtonCategory from '../components/ButtonCategory';
import Cards from '../components/Cards';

function Foods() {
  const {
    foodCategories,
    recipeFoods,
  } = useContext(AppFoodContext);

  if (recipeFoods) console.log(recipeFoods);

  return (
    <>
      <Header title="Foods" btnSearch />
      {recipeFoods ? <Cards FoodOrDrink={ recipeFoods } food /> : ''}
      {recipeFoods?.slice(0,12)
      .map((meal, index) => (
        <div key={ meal.idMeal }>
          <p data-testid={`${index}-card-name`}>{meal.strMeal}</p>
          <img data-testid={`${index}-card-img`} src={ meal.strMealThumb } alt={ meal.strMeal } />
          <p data-testid={`${index}-recipe-card`}>{meal.strInstructions}</p>
        </div>
      ))}
      <ButtonCategory categories={ foodCategories } />
    </>
  );
}

export default Foods;
