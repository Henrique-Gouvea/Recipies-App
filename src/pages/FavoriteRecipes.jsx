import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { shareLink } from '../services/utilities';

function FavoriteRecipes() {
  const [isCopied, setCopied] = useState(false);
  const history = useHistory();
  const handleclick = (id, type) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    shareLink(setCopied, url);
  };
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.table((favorites));
  return (
    <>
      <Header title="Favorite Recipes" />
      <h1>FavoriteRecipes</h1>
      <div>
        {favorites && favorites.map((el, index) => (
          <div key={ Math.random() * 100 }>
            <p
              data-testid={ `${index}-horizontal-name` }
              aria-hidden="true"
              onClick={ () => history.push(`/${el.type}s/${el.id}`) }
            >
              {`Name: ${el.name}`}
            </p>
            <img
              src={ el.image }
              data-testid={ `${index}-horizontal-image` }
              alt="alt"
              aria-hidden="true"
              onClick={ () => history.push(`/${el.type}s/${el.id}`) }
            />
            {/* <p data-testid={`${index}-horizontal-top-text`}>{`Category: ${el.category}`}</p> */}
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${el.nationality} - ${el.category} - ${el.alcoholicOrNot}`}

            </p>
            <p
              data-testid={ `"${index}-${el.strTags}-horizontal-tag"` }
            >
              {el.strTags}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{el.dateModified}</p>
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
            <button
              src={ blackHeartIcon }
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              <img className="shareIcon" src={ blackHeartIcon } alt="blackHeartIcon" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </>
  );
}

export default FavoriteRecipes;
