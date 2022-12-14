import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import ExploreDrinks from './pages/explore/ExploreDrinks';
import ExploreFoods from './pages/explore/ExploreFoods';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import IngredientsDrinks from './pages/ingredients/IngredientsDrinks';
import IngredientsFoods from './pages/ingredients/IngredientsFoods';
import Nationalities from './pages/Nationalities';
import Details from './pages/details/Details';
import NotFound from './pages/NotFound';

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
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ IngredientsDrinks }
        />
        <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
        <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/foods/:id" component={ Details } />
        <Route exact path="/drinks/:id" component={ Details } />
        <Route exact path="/foods/:id/in-progress" component={ Details } />
        <Route exact path="/drinks/:id/in-progress" component={ Details } />
        <Route path="" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
