import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom';
import {ShowsProvider} from './Context';
import ScrollToTop from './ScrollToTop';


ReactDOM.render(
  // {/* <React.StrictMode> */}
    <ShowsProvider>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </ShowsProvider>
  // {/* </React.StrictMode> */}
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

