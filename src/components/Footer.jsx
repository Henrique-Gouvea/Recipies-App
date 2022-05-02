import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinkIcon.svg" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
      >
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="exploreIcon.svg" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="mealIcon.svg" />
      </button>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Footer;
