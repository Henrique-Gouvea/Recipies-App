import React, { useRef } from 'react';
import { arrayOf, func, shape, number, string } from 'prop-types';

function Recommendeds({ value }) {
  const { recommendeds } = value;
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
