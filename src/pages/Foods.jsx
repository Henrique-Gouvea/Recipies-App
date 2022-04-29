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
      {recipeFoods ? <Cards FoodOrDrink={ recipeFoods } /> : ''}
      <ButtonCategory categories={ foodCategories } />
    </>
  );
}

export default Foods;
