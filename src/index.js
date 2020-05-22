import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {ShowsProvider} from './Context';
import ScrollToTop from './ScrollToTop';


ReactDOM.render(
  // {/* <React.StrictMode> */}
    <ShowsProvider>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </ShowsProvider>
  // {/* </React.StrictMode> */}
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

