import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore({ history }) {
  return (
    <>
      <Header title="Explore Foods" />
      <button
        data-testid="explore-foods"
        type="submit"
        onClick={ () => history.push('/explore/foods') }
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        type="submit"
        onClick={ () => history.push('/explore/drinks') }
      >
        Explore Drinks
      </button>
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Explore;
