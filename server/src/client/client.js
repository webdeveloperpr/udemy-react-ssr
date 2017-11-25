// Startup point for the client side application
import 'babel-polyfill';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import reducers from './reducers';
import Routes from './Routes';

const axiosInstance = axios.create({
    baseURL: '/api',
  }
);

const store = createStore(
  reducers,
  window.INITIAL_STATE, // redux store rendered by ssrStore
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// browser router is used for browser rendered content
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {renderRoutes(Routes)}
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.hydrate(app, document.getElementById('root'));

// Remove the initialState from the app
delete window.INITIAL_STATE;