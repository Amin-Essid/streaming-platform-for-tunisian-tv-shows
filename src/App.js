import React from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import TvShows from './pages/TvShows'
import SingleTvShow from './pages/SingleTvShow';
import Stream from "./pages/Stream";
import {Route, Switch} from 'react-router-dom';
import Errr from './pages/Error';
import Footer from './components/Footer';
import Ads from './components/Ads';

function App() {
  return (
    <>
      <Header />
      <Ads />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:showsType' component={TvShows} />
        <Route exact path='/:showsType/:stvs' component={SingleTvShow} />
        <Route exact path='/:showsType/:stvs/:stream' component={Stream} />
        <Route component={Errr} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
