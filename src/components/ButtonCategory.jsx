import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppFoodContext from '../context/AppFoodContext';

function ButtonCategory({ categories }) {
  const {
    setCategoryClick,
  } = useContext(AppFoodContext);
  const limitButtonCategory = 5;

  // const clickButtonCategory = ({ target: { value } }) => {
  //   const ka = async () => {
  //     console.log(value);
  //     const a = `www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
  //     // const teste = await filterApi(value);
  //     console.log(a);
  //     const teste = await linkApi(a);
  //     console.log(teste);
  //   };
  //   ka();
  // };

  return (
    <>
      <p>-</p>
      {categories
        ? categories.slice(0, limitButtonCategory)
          .map((cat) => (
            <button
              key={ cat.strCategory }
              type="submit"
              value={ cat.strCategory }
              data-testid={ `${cat.strCategory}-category-filter` }
              onClick={ ({ target }) => setCategoryClick(target.value) }
            >
              {cat.strCategory}
            </button>
          )) : ''}
    </>
  );
}

ButtonCategory.propTypes = {
  slice: PropTypes.func,
}.isRequired;

export default ButtonCategory;
