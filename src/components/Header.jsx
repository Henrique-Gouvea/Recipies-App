import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, btnSearch }) {
  return (
    <header className="header">
      <h1 data-testid="page-title">
        {title}
      </h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        src="../images/profileIcon.svg"
      >
        <img src={ profileIcon } alt="profileIcon" />
        {/* Profile */}
      </button>
      {btnSearch
        ? (
          <button
            type="button"
            data-testid="search-top-btn"
            src="../images/searchIcon.svg"
          >
            <img src={ searchIcon } alt="searchIcon" />
            {/* Search */}
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
