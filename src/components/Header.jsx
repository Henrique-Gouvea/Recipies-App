/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, btnSearch }) {
  const history = useHistory();
  const [hideSearchBar, showSearchBar] = useState(false);

  const toggleSearchBar = () => {
    showSearchBar(!hideSearchBar);
  };
  return (
    <header className="header">
      <h1 data-testid="page-title">
        {title}
      </h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        src="../images/profileIcon.svg"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="profileIcon" />
        {}
      </button>
      {btnSearch
        ? (
          <button
            type="button"
            data-testid="search-top-btn"
            src="../images/searchIcon.svg"
            onClick={ toggleSearchBar }
          >
            <img src={ searchIcon } alt="searchIcon" />
            {/* Search */}
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
              data-testid="search-input"
            />
            <label htmlFor="ingredientID">
              Ingredient
              <input
                id="ingredientID"
                type="radio"
                data-testid="ingredient-search-radio"
              />
            </label>
            <label htmlFor="nameSearchID">
              Name
              <input
                id="nameSearchID"
                type="radio"
                data-testid="name-search-radio"
              />
            </label>
            <label htmlFor="firstLetterID">
              First letter
              <input
                id="firstLetterID"
                type="radio"
                data-testid="first-letter-search-radio"
              />
            </label>
            <button
              id="butonExecID"
              type="button"
              data-testid="exec-search-btn"
              onClick={ (e) => {
                console.log(e.target);
              } }
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
