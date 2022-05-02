import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ButtonsExplore from './ButtonsExplore';

function ExploreFoods() {
  return (
    <>
      <Header title="Explore Foods" />
      <ButtonsExplore food />
      <h1>Explore Foods</h1>
      <Footer />
    </>
  );
}

export default ExploreFoods;
