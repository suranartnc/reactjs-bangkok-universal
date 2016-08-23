var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {

  entry: {
    app: [
      path.join(__dirname, 'src/shared/theme/styles/app.scss'),
      path.join(__dirname, 'src/client.js')
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      "react-router-scroll",
      "redux"
    ]
  },

  output: {
    path: path.join(__dirname, "static", "build", "[hash]"),
    publicPath: "/build/[hash]/",
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ 
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ 
          fallbackLoader: 'style-loader',
          loader: 'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]&minimize!postcss!sass'
        })
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ],
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BROWSER': JSON.stringify(true)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, 'static'),
      prettyPrint: true
    }),
    new ExtractTextPlugin({ 
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      path: path.join(__dirname, "static", "build", "vendors"),
      filename: "[name].[hash].js",
    })
  ],

  postcss: [
    autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] })
  ],

  sassLoader: {
    includePaths: [path.join(__dirname, "src/shared/theme/styles")]
  }
};