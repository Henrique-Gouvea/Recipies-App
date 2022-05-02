import React, { useEffect, useRef, useState } from 'react';
import { arrayOf, func, shape, number, string } from 'prop-types';
import { useHistory } from 'react-router-dom';

function Recommendeds({ recommendeds, ID, option }) {
  const [progress, setProgress] = useState(false);
  const carousel = useRef();
  const history = useHistory();
  const path = `${history.location.pathname}/in-progress`;

  function handleClick({ target: { name } }) {
    switch (name) {
    case 'right':
      carousel.current.scrollLeft += carousel.current.offsetWidth;
      break;
    default:
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  }

  useEffect(() => {
    (() => {
      const getProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ForD = option === 'foods' ? 'meals' : 'cocktails';
      if (getProgress && getProgress[ForD][ID]) {
        setProgress(true);
      }
    })();
  }, [ID, option]);

  return (
    <section className="container">
      <h5>Recommendeds</h5>
      <div className="carousel" ref={ carousel }>
        { recommendeds && recommendeds.map((item, i) => (
          <div className="item" key={ i } data-testid={ `${i}-recomendation-card` }>
            <img
              src={ item.strMealThumb || item.strDrinkThumb }
              alt={ item.strMeal || item.strDrink }
            />
            <p>{ item.strAlcoholic || item.strCategory }</p>
            <h6
              data-testid={ `${i}-recomendation-title` }
            >
              {item.strMeal || item.strDrink}
            </h6>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button name="left" type="button" onClick={ handleClick }>Left</button>
        <button name="right" type="button" onClick={ handleClick }>Right</button>
      </div>
      <button
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(path) }
      >
        {!progress ? 'Start Recipe' : 'Continue Recipe'}
      </button>
    </section>
  );
}

Recommendeds.propTypes = {
  recommendeds: arrayOf(shape({
    map: func,
  })),
  ID: number,
  option: string,
}.isRequired;

export default Recommendeds;
