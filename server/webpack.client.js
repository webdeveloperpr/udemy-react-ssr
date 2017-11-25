const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

// this webpack config is intended to build our application after we receive the
// server side rendered code.
const config = {
  // Tell webpack the root file of our client app
  entry: './src/client/client.js',

  // Tell webpack where to put the webpack file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};

module.exports = merge(baseConfig, config);
