import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();
  console.log(history);
  return (
    <div data-testid="footer" className="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src="../images/drinkIcon.svg"
        onClick={ () => history.push('/drinks') }
      >
        <img src="drinkIcon.svg" alt="drinkIcon.svg" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        src="../images/exploreIcon.svg"
        onClick={ () => history.push('/explore') }
      >
        <img src="exploreIcon.svg" alt="exploreIcon.svg" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        src="../images/mealIcon.svg"
        onClick={ () => history.push('/foods') }
      >
        <img src="mealIcon.svg" alt="mealIcon.svg" />
      </button>
    </div>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default Footer;
