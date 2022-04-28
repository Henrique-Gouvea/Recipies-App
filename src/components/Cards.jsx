import React from 'react';

function Cards({FoodOrDrink, food}) {
  return (
    <>
      {FoodOrDrink?.slice(0,12)
      .map((ForD, index) => (
        <div key={ food? ForD.idMeal : ForD.idDrink }>
          <p data-testid={`${index}-card-name`}>
              { food? ForD.strMeal : ForD.strDrink }
          </p>
          <img
            data-testid={`${index}-card-img`}
            src={ food? ForD.strMealThumb : ForD.strDrinkThumb }
            alt={ food? ForD.strMeal : ForD.strDrink  } />
          <p data-testid={`${index}-recipe-card`}>
              {ForD.strInstructions}
          </p>
        </div>
      ))}
    </>
  );
}

export default Cards;
