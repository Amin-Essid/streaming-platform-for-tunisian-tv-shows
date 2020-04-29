import React from 'react';
import './App.css';
import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';
import TvShows from './pages/TvShows.js'
import SingleTvShow from './pages/SingleTvShow';
import Stream from "./pages/Stream.js";
import {Route, Switch} from 'react-router-dom';
import Error from './pages/Error.js';

function App() {
  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/TvShows' component={TvShows} />
        <Route exact path='/:sts' component={SingleTvShow} />
        <Route exact path='/:sts/:strm' component={Stream} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
