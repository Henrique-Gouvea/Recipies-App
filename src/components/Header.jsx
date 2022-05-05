import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppFoodContext from '../context/AppFoodContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import apiRequestByLink from '../services/apiRequestByLink';

function Header({ title, btnSearch }) {
  const history = useHistory();
  const [hideSearchBar, showSearchBar] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const {
    setRecipeFoods,
  } = useContext(AppFoodContext);

  const toggleSearchBar = () => {
    showSearchBar(!hideSearchBar);
  };
  const handleChange = ({ target: { value, name, id } }) => {
    if (name === 'nameSearchBar') {
      setInputValue(value);
    } else {
      setRadioValue(id);
    }
  };

  const handlFilter = async () => {
    let data = [];
    switch (radioValue) {
    case 'nameSearchID':
      data = (await apiRequestByLink(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`));
      break;
    case 'ingredientID':
      data = (await apiRequestByLink(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`));
      break;
    case 'firstLetterID':
      if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        data = (await apiRequestByLink(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`));
      }
      break;
    default: console.log('errou');
    }
    setRecipeFoods(data.meals);
  };
  return (
    <header className="header">
      <h1 data-testid="page-title">
        {title}
      </h1>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
        />
      </button>
      {btnSearch
        ? (
          <button
            type="button"
            onClick={ toggleSearchBar }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="searchIcon"
            />
          </button>
        )
        : ''}
      {hideSearchBar
        ? (
          <label htmlFor="searchBar">
            SearchBar
            <input
              id="searchBar"
              type="text"
              name="nameSearchBar"
              data-testid="search-input"
              value={ inputValue }
              onChange={ handleChange }
            />
            <label htmlFor="ingredientID">
              Ingredient
              <input
                id="ingredientID"
                type="radio"
                name="inputName"
                onClick={ handleChange }
                data-testid="ingredient-search-radio"
              />
            </label>
            <label htmlFor="nameSearchID">
              Name
              <input
                id="nameSearchID"
                name="inputName"
                type="radio"
                onClick={ handleChange }
                data-testid="name-search-radio"
              />
            </label>
            <label htmlFor="firstLetterID">
              First letter
              <input
                id="firstLetterID"
                name="inputName"
                type="radio"
                onClick={ handleChange }
                data-testid="first-letter-search-radio"
              />
            </label>
            <button
              id="butonExecID"
              type="button"
              data-testid="exec-search-btn"
              onClick={ handlFilter }
            >
              Search
            </button>
          </label>)
        : ''}

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  btnSearch: PropTypes.bool,
}.isRequired;

export default Header;
