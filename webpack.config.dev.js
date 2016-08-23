var path = require('path');
var webpack = require('webpack');

var config = require('./src/shared/configs');

module.exports = {

  devtool: 'cheap-module-eval-source-map',

  entry: [
    `webpack-dev-server/client?http://${config.host}:${config.wdsPort}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src/shared/theme/styles/app.scss'),
    path.join(__dirname, 'src/client.js')
  ],

  output: {
    path: path.join(__dirname, "static", "build"),
    publicPath: `http://${config.host}:${config.wdsPort}/build/`,
    filename: '[name].js',
    chunkFilename: "[name].js"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              module: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            query: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif)$/,
        loaders: 'file-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules')
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'BROWSER': JSON.stringify(true)
      }
    })
  ],

  postcss: [],

  sassLoader: {
    includePaths: [path.join(__dirname, "src/shared/theme/styles")]
  },

  devServer: {
    port: config.wdsPort,
    hot: true,
    inline: false,
    historyApiFallback: true
  }
};