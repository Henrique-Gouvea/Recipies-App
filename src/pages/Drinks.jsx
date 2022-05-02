import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ButtonCategory from '../components/ButtonCategory';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';
import Cards from '../components/Cards';

function Drinks({ history }) {
  const { recipeDrinks, drinkCategories } = useContext(AppFoodContext);

  return (
    <>
      <Header title="Drinks" btnSearch />
      <div
        aria-hidden="true"
        onClick={ ({ target }) => history.push(`/drinks/${target.className}`) }
      >
        {recipeDrinks ? <Cards FoodOrDrink={ recipeDrinks } /> : ''}
      </div>
      <ButtonCategory categories={ drinkCategories } />
      <h1>Drinks</h1>
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Drinks;
