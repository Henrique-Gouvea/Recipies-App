import React, { useRef } from 'react';
import { arrayOf, func, shape } from 'prop-types';

function Recommendeds({ recommendeds }) {
  const carousel = useRef(null);

  function handleClick({ target: { name } }) {
    switch (name) {
    case 'right':
      carousel.current.scrollLeft += carousel.current.offsetWidth;
      break;
    default:
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  }

  return (
    <section className="container">
      <h5>Recommendeds</h5>
      <div className="carousel" ref={ carousel }>
        { recommendeds && recommendeds.map((item, i) => (
          <div className="item" key={ i }>
            <img
              src={ item.strMealThumb || item.strDrinkThumb }
              alt={ item.strMeal || item.strDrink }
            />
            <p>{item.strCategory}</p>
            <h6>{item.strMeal || item.strDrink}</h6>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button name="left" type="button" onClick={ handleClick }>Left</button>
        <button name="right" type="button" onClick={ handleClick }>Right</button>
      </div>
    </section>
  );
}

Recommendeds.propTypes = {
  recommendeds: arrayOf(shape({
    map: func,
  })),
}.isRequired;

export default Recommendeds;
