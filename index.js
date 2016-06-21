'use strict';

const meta = require('./package');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('uberconfig-webpack-common');
const WebpackDevServer = require('webpack-dev-server');
const logger = require('gulplog');

module.exports = {
  meta,
  config: Object.assign({}, webpackConfig.defaults, {
    'webpack.entry.demoApp': {
      default: './demo/app.js',
    },
    'demo.hot': { default: true },
    'demo.folder': { default: 'demo/' },
    'demo.port': { default: 8000 },
    'demo.host': { default: 'localhost' },
  }),
  get(helper) {
    return function demo() {
      const config = helper.getConfig();
      let webpackDemoConfig = webpackConfig(config);

      if (!config.production && config.demo.hot) {
        webpackDemoConfig = webpackDemoConfig.merge({
          plugins: [
            new webpack.HotModuleReplacementPlugin(),
          ],
        });
        webpackDemoConfig.entry.demoApp = [].concat(
          webpackDemoConfig.entry.demoApp,
          `webpack-dev-server/client?http://${config.demo.host}:${config.demo.port}/`
        );
      }

      const compiler = webpack(webpackDemoConfig);
      const server = new WebpackDevServer(compiler, {
        contentBase: path.resolve(config.demo.folder),
      });

      server.listen(config.demo.port, config.demo.host);
      logger.info(`demo running: http://${config.demo.host}:${config.demo.port}`);
    };
  },
};
