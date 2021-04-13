import React from 'react'

import {
  Home, Movies, Series, MovieDetail, SeriesDetail
} from './pages/index.js'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import './App.sass';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/movie/detail/:id">
          <MovieDetail/>
        </Route>
        <Route path="/series/detail/:id">
          <SeriesDetail/>
        </Route>
        <Route path="/movies">
          <Movies/>
        </Route>
        <Route path="/series">
          <Series/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
