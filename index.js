'use strict';

const meta = require('./package');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = {
  meta,
  config: {},
  get() {
    return function demo() {
      const compiler = webpack({
        devtool: 'eval',
        debug: false,
        entry: {
          demoApp: path.resolve('demo/app.js'),
        },
        output: {
          path: path.resolve('dist/'),
          filename: 'demoApp.js',
          publicPath: '/',
        },
      });

      const server = new WebpackDevServer(compiler, {
        contentBase: path.resolve('demo/'),
      });

      server.listen(8000, 'localhost');
    };
  },
};
