import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { title, btnSearch } = this.props;
    return (
      <header>
        <h1 data-testid="page-title">
          {title}
        </h1>
        <button
          type="button"
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
        >
          <img src="../images/profileIcon.svg" alt="profileIcon" />
          {/* Profile */}
        </button>
        {btnSearch
          ? (
            <button
              type="button"
              data-testid="search-top-btn"
              src="../images/searchIcon.svg"
            >
              <img src="../images/searchIcon.svg" alt="searchIcon" />
              {/* Search */}
            </button>
          )
          : ''}
      </header>
    );
  }
}
Header.propTypes = {
  title: PropTypes.string,
  btnSearch: PropTypes.bool,
}.isRequired;

export default Header;
