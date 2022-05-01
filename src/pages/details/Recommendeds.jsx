import React, { useRef } from 'react';
import { arrayOf, func, shape } from 'prop-types';

function Recommendeds({ recommendeds }) {
  const carousel = useRef();

  function handleClick({ target: { name } }) {
    switch (name) {
    case 'right':
      carousel.current.scrollLeft += carousel.current.offsetWidth;
      break;
    default:
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  }

  console.log(recommendeds);

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
      >
        Start Recipe
      </button>
    </section>
  );
}

Recommendeds.propTypes = {
  recommendeds: arrayOf(shape({
    map: func,
  })),
}.isRequired;

export default Recommendeds;
