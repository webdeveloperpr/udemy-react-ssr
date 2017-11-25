import React from 'react';
import Helmet from 'react-helmet';
const head = () => {
  return (
    <Helmet>
      <title>Home</title>
      <meta property="og:title" content="Users App"/>
    </Helmet>
  )
};

const Home = () => {
  return (
    <div className="center-align" style={{ marginTop: '200px', padding: '0 10px' }}>
      {head()}
      <h3>
        Welcome
      </h3>
      <p>Checkout this awesome features!</p>
    </div>
  )
};

export default {
  component: Home
};
