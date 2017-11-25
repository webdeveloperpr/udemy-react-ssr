// defines the runtime generator for async/await
import proxy from 'express-http-proxy';
import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const port = 3000;
const app = express();

const proxyReqOptDecorator = opts => {
  opts.headers['x-forwarded-host'] = 'localhost:3000';

  return opts;
};

// We need to proxy requests in order to authenticate a user when the
// ssr bundle loads, then be able to make following requests when the
// client bundle loads.
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', { proxyReqOptDecorator },
  ));

// the script tag will look in here for the bundle.js file
app.use(express.static('public'));

app.get('*', (req, res) => {
  // We attempt to get the store ready before we render.
  const store = createStore(req);

  // This function will look at the component's loadData function and
  // call if before we SSR render the application.
  const promises = matchRoutes(Routes, req.path)
  // loadData function from the pages
    .map(({ route }) => route.loadData
      ? route.loadData(store)
      : null)
    // wrap in promises so that promise.all does not end early
    .map(promise => promise
      ? new Promise((resolve => promise.then(resolve).catch(resolve)))
      : null
    );

  // Some logic to initialize and load logic into the store.
  Promise
    .all(promises)
    .then(() => {
      // context is used by the static router to send back information to the parent component
      const context = {};
      const content = renderer(req, store, context);

      // redirect user if the context is 301
      if (context.url) {
        return res.redirect(301, context.url);
      }

      if (context.notFound) {
        res.status(404);
      }

      res.send(content);
    })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
