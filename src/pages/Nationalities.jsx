import React, { useContext, useEffect } from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppFoodContext from '../context/AppFoodContext';
import apiRequestbylink from '../services/apiRequestByLink';

function Nationalities() {
  const { foodCountry,
    nationaliteSelected,
    setNationaliteSelected,
    nationaliteArr,
    setNationaliteArr,
  } = useContext(AppFoodContext);

  useEffect(() => {
    apiRequestbylink(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationaliteSelected}`,
    ).then((e) => setNationaliteArr(e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationaliteSelected]);

  if (nationaliteArr) console.log(nationaliteArr);

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
      </select>
      {nationaliteArr ? <Cards FoodOrDrink={ nationaliteArr.meals } /> : ''}
      <Footer />
    </>
  );
}

export default Nationalities;
