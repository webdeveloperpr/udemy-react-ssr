const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we are building a bundle for nodeJS
  target: 'node',

  // Tell webpack the root file of our server app
  entry: './src/index.js',

  // Tell webpack where to put the webpack file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  // don't bundle anything from the node_modules folder if it exists in the node_modules folder
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
