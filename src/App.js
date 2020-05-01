import React from 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import TvShows from './pages/TvShows'
import SingleTvShow from './pages/SingleTvShow';
import Stream from "./pages/Stream";
import {Route, Switch} from 'react-router-dom';
import Errr from './pages/Error';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/TvShows' component={TvShows} />
        <Route exact path='/:sts' component={SingleTvShow} />
        <Route exact path='/:sts/:strm' component={Stream} />
        <Route component={Errr} />
      </Switch>
    </>
  );
}

export default App;
