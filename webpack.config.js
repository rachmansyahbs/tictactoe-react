try {
  var path = require('path');
  var webpack = require('webpack');
  var srcPath = path.resolve(__dirname, 'src');
  var buildPath = path.resolve(__dirname, 'build');
  var indexHtmlPath = path.resolve(__dirname, 'src', 'index.html');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
}
catch (e) {
  throw new Error('Missing webpack build dependencies');
}

var config = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: buildPath,
    publicPath: '/'
  },

  context: srcPath,

  devtool: 'eval',

  devServer: {
    open: true,
    contentBase: buildPath,
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath
    }),
    new webpack.NamedModulesPlugin()
  ]
};

module.exports = config;