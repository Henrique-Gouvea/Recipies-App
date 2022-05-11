import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  return (
    <>
      <Header title="Profile" />
      <p data-testid="profile-email">{localStorage.getItem('user')}</p>
      <button
        type="submit"
        onClick={ () => history.push('/done-recipes') }
        value="Done Recipes"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="submit"
        onClick={ () => history.push('/favorite-recipes') }
        data-testid="profile-favorite-btn"
        value="Favorite Recipes"
      >
        Favorite Recipes
      </button>
      <button
        type="submit"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
        value="Logout"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
