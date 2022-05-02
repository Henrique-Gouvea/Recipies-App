import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import ExploreDrinks from './pages/explore/ExploreDrinks';
import ExploreFoods from './pages/explore/ExploreFoods';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import IngredientsDrinks from './pages/IngredientsDrinks';
import IngredientsFoods from './pages/IngredientsFoods';
import Nationalities from './pages/Nationalities';
import Details from './pages/details/Details';
import InProgress from './pages/InProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
        <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/foods/:id" component={ Details } />
        <Route exact path="/drinks/:id" component={ Details } />
        <Route exact path="/foods/:id/in-progress" component={ InProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ InProgress } />
      </Switch>
    </div>
  );
}

export default App;
