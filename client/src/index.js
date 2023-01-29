import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider }from 'react-redux';
import store from './store'
import axios from "axios";
import {BrowserRouter as Router} from 'react-router-dom';
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:4000"

ReactDOM.render(
  <Provider store={store}>
      <Router>
          <React.StrictMode>
            <App />
          </React.StrictMode>
      </Router>
  </Provider>,
  document.getElementById('root')
);
