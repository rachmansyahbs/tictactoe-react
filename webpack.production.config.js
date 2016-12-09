try {
  var path = require('path');
  var autoprefixer = require('autoprefixer');
  var webpack = require('webpack');
  var srcPath = path.resolve(__dirname, 'src');
  var buildPath = path.resolve(__dirname, 'build');
  var indexHtmlPath = path.resolve(__dirname, 'src', 'index.html');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
}
catch (e) {
  throw new Error('Missing webpack build dependencies');
}

var config = {
  entry: [
    './index.js'
  ],

  output: {
    filename: 'static/js/bundle.[chunkhash:8].js',
    chunkFilename: 'static/js/bundle.[chunkhash:8].chunk.js',
    path: buildPath,
    publicPath: '/'
  },

  context: srcPath,

  devtool: 'source-map',

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
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss')
      }
    ]
  },

  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ]
      }),
    ];
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
  ]
};

module.exports = config;