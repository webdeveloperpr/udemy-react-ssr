// This file creates the SSR store
import axios from 'axios';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../client/reducers';

// We pass along the cookie from the user to keep making requests.
export default req => {

  // We create a new instance with a cookie
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' },
  });

  return createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
}
