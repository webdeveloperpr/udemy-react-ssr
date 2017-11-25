module.exports = {
  module: {
    rules: [
      // Tell webpack to run babel on any file that it encounters
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            // this is the babel-preset that includes the necessary plugins for the browsers
            ['env', { targets: { browsers: 'last 2 versions', } }]
          ]
        },
      }
    ]
  }
};

