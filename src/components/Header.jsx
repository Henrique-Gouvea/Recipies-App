import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, btnSearch }) {
  const history = useHistory();

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
      </button>
      {btnSearch
        ? (
          <button
            type="button"
            data-testid="search-top-btn"
            src="../images/searchIcon.svg"
          >
            <img src={ searchIcon } alt="searchIcon" />
          </button>
        )
        : ''}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  btnSearch: PropTypes.bool,
}.isRequired;

export default Header;
