import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';
import ButtonCategory from '../components/ButtonCategory';
import Cards from '../components/Cards';

function Foods() {
  const history = useHistory();
  const {
    foodCategories,
    recipeFoods,
  } = useContext(AppFoodContext);

  return (
    <>
      <Header title="Foods" btnSearch />
      <div
        aria-hidden="true"
        onClick={ ({ target }) => history.push(`/foods/${target.className}`) }
      >
        {recipeFoods ? <Cards FoodOrDrink={ recipeFoods } /> : ''}
      </div>
      <ButtonCategory categories={ foodCategories } food />
      <h1>Foods</h1>
      <Footer />
    </>
  );
}

export default Foods;
