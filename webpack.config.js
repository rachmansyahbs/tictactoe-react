try {
  var path = require('path');
  var webpack = require('webpack');
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
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },

  context: path.resolve(__dirname, 'src'),

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
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
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new webpack.NamedModulesPlugin()
  ]
};

module.exports = config;