import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppFoodContext from '../context/AppFoodContext';

function ButtonCategory({ categories, food }) {
  const {
    categoryClick,
    setCategoryClick,
  } = useContext(AppFoodContext);
  const limitButtonCategory = 5;

  const clickButtonCategory = ({ target }) => {
    if (categoryClick.categorie !== target.value) {
      setCategoryClick({
        categorie: target.value,
        type: food ? 'food' : 'drink',
      });
    } else {
      setCategoryClick({
        categorie: '',
        type: '',
      });
    }
  };

  return (
    <>
      {categories
        ? categories.slice(0, limitButtonCategory)
          .map((cat) => (
            <button
              key={ cat.strCategory }
              type="submit"
              value={ cat.strCategory }
              data-testid={ `${cat.strCategory}-category-filter` }
              onClick={ clickButtonCategory }
            >
              {cat.strCategory}
            </button>
          )) : ''}
      <button
        type="submit"
        value="All category"
        data-testid="All-category-filter"
        onClick={ () => setCategoryClick({ categorie: '', type: '' }) }
      >
        All category
      </button>
    </>
  );
}

ButtonCategory.propTypes = {
  slice: PropTypes.func,
}.isRequired;

export default ButtonCategory;
