import React from 'react';
import Helmet from 'react-helmet';

const head = () => {
  return (
    <Helmet>
      <title>Page Not Found</title>
      <meta property="og:title" content="Users App"/>
    </Helmet>
  )
};

// staticContext only exists serverSide
const NotFoundPage = ({ staticContext = {} }) => {

  // this variable is created on the server and we can set
  // this to true in order to tell the server to change the
  // status to 404
  staticContext.notFound = true;
  return (
    <div>
      {head()}
      <h1>oops, route not found</h1>
    </div>
  );
};

export default {
  component: NotFoundPage,
};