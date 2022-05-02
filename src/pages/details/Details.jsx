import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apiRequestByLink from '../../services/apiRequestByLink';
import Recommendeds from './Recommendeds';
import AppFoodContext from '../../context/AppFoodContext';
import Buttons from './Buttons';
import DetailsInfo from './DetailsInfo';
import Ingredients from './Ingredients';
import Video from './Video';
import './Details.css';

function FoodDetails() {
  const { recipeFoods, recipeDrinks } = useContext(AppFoodContext);
  const [details, setDetails] = useState('');
  const [recommendeds, setRecommendeds] = useState('');
  const history = useHistory();
  const option = history.location.pathname.replace(/[^a-zA-Z]+/g, '');
  const ID = history.location.pathname.replace(/\D/g, '');

  useEffect(() => {
    (async () => {
      const foodData = await apiRequestByLink(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`,
      );
      const drinkData = await apiRequestByLink(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`,
      );

      const SIX = 6;

      switch (option) {
      case 'foods':
        setDetails(foodData.meals[0]);
        setRecommendeds(recipeDrinks.slice(0, SIX));
        break;
      default:
        setDetails(drinkData.drinks[0]);
        setRecommendeds(recipeFoods.slice(0, SIX));
      }
    })();
  }, [ID, option, recipeDrinks, recipeFoods, setDetails]);

  const data = { details, ID, option, recommendeds };

  return (
    <div>
      { details
        && (
          <>
            <DetailsInfo value={ data } />

            <Buttons value={ data } />

            <Ingredients value={ data } testid />

            <Video value={ data } />

            <Recommendeds value={ data } />
          </>
        )}
    </div>
  );
}

export default FoodDetails;
