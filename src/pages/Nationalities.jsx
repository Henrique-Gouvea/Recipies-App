import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';
import apiRequestbylink from '../services/apiRequestByLink';

function Nationalities({ history }) {
  const { foodCountry,
    nationaliteSelected,
    setNationaliteSelected,
    nationaliteArr,
    setNationaliteArr,
    recipeFoods,
  } = useContext(AppFoodContext);

  useEffect(() => {
    if (nationaliteSelected !== 'All') {
      apiRequestbylink(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationaliteSelected}`,
      ).then((e) => setNationaliteArr(e));
    } else setNationaliteArr(recipeFoods);
  }, [nationaliteSelected, recipeFoods, setNationaliteArr]);

  return (
    <>
      <Header title="Explore Nationalities" btnSearch />
      <select
        data-testid="explore-by-nationality-dropdown"
        value={ nationaliteSelected }
        onChange={ (e) => setNationaliteSelected(e.target.value) }
      >
        {foodCountry && foodCountry.map((count) => (
          <option
            key={ count.strArea }
            data-testid={ `${count.strArea}-option` }
          >
            {count.strArea}
          </option>))}
        <option data-testid="All-option">All</option>
      </select>
      <div
        aria-hidden="true"
        onClick={ ({ target }) => history.push(`/foods/${target.className}`) }
      >
        {nationaliteArr
          ? <Cards FoodOrDrink={ nationaliteArr.meals || recipeFoods } />
          : ''}
      </div>
      <Footer />
    </>
  );
}

Nationalities.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Nationalities;
