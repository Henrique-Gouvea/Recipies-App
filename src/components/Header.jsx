import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { title } = this.props;
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
          Profile
        </button>

        <br />
        <button
          type="button"
          data-testid="search-top-btn"
          src="../images/searchIcon.svg"
        >
          Search
        </button>
      </header>
    );
  }
}
Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
