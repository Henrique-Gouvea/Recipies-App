/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';
import ButtonCategory from '../components/ButtonCategory';
import Cards from '../components/Cards';

function Foods({ history }) {
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

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Foods;
