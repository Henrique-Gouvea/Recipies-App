import React, { useEffect, useState } from 'react';
import { number, string } from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { shareLink, storageFavorites } from '../../services/utilities';

function Buttons({ value }) {
  const { id, details, option } = value;
  const [isCopied, setCopied] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const favStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    (() => {
      const checkFav = favStorage?.filter((el) => id === el.id);
      setFavorite(favStorage && checkFav.length > 0);
    })();
  }, [id, favStorage]);

  function saveStorage(array) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  }

  function favorite() {
    switch (true) {
    case !isFavorite && favStorage !== null:
      saveStorage([...favStorage, storageFavorites(details, option)]);
      setFavorite(true);
      break;
    case !isFavorite:
      saveStorage([storageFavorites(details, option)]);
      setFavorite(true);
      break;
    default:
      saveStorage(favStorage?.filter((item) => item.id !== id));
      setFavorite(false);
    }
  }

  return (
    <>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => shareLink(setCopied) }
      >
        { !isCopied ? 'Share' : 'Link copied!' }
      </button>
      <button
        type="button"
        onClick={ favorite }
        className="favorite"
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="Favorite"
        />
      </button>
    </>
  );
}

Buttons.propTypes = {
  id: number,
  option: string,
}.isRequired;

export default Buttons;
