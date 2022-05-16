// import React, { useContext, useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { shareLink } from '../services/utilities';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isCopied, setCopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const handleclick = (id, type) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    shareLink(setCopied, url);
  };

  const handleDrinks = () => {
    const onlyDrinks = doneRecipes.filter((el) => el.type !== 'food');
    setDoneRecipes(onlyDrinks);
  };

  const handleFoods = () => {
    const onlyFoods = doneRecipes.filter((el) => el.type !== 'drink');
    setDoneRecipes(onlyFoods);
  };

  const removeFilters = () => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  return (
    <>
      <Header title="Done Recipes" />
      <h1>DoneRecipes</h1>
      <div>
        {doneRecipes && doneRecipes.map((el, index) => (
          <div key={ Math.random() * 100 }>
            <p
              data-testid={ `${index}-horizontal-name` }
              aria-hidden="true"
              onClick={ () => history.push(`/${el.type}s/${el.id}`) }
            >
              {el.name}
            </p>
            <img
              src={ el.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ el.image }
              aria-hidden="true"
              onClick={ () => history.push(`/${el.type}s/${el.id}`) }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${el.nationality} - ${el.category} ${el.alcoholicOrNot}`}
            </p>
            <p data-testid={ `${index}-${el.tags[0]}-horizontal-tag` }>
              {el.tags[0]}
            </p>
            <p data-testid={ `${index}-${el.tags[1]}-horizontal-tag` }>
              {el.tags[1]}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
            <button
              src={ shareIcon }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleclick(el.id, el.type) }
            >
              { !isCopied
                ? <img className="shareIcon" src={ shareIcon } alt="shareIcon" />
                : 'Link copied!' }
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => removeFilters() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFoods() }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleDrinks() }
      >
        Drinks
      </button>

    </>
  );
}

export default DoneRecipes;
