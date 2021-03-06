import React from 'react';
// guards us against xss attacks
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import Routes from '../client/Routes';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// loadData functions have already been called so our store is already
// populated
export default (req, ssrStore, context) => {
  // generate initial html
  const content = renderToString(
    <Provider store={ssrStore}>
      <StaticRouter
        location={req.path}
        context={context}
      >
        <div>
          {renderRoutes(Routes)}
        </div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
  <html>
    <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
      window.INITIAL_STATE = ${serialize((ssrStore.getState()))}
      </script>
      <script src="bundle.js"></script>
    </body>
   </html>
`;
};