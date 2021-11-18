const webpackCommon = require('./webpack.common');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  ...webpackCommon,
  mode: 'production',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};
