// node modules
const path = require('path');

// webpack plugin
const webpack = require('webpack');
const Nyanprogresswebpackplugin = require('nyan-progress-webpack-plugin');
const Watch = require('./webpackPlugin/watch');
// const notifier = require('node-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


// custom plugin
const desolation = require('./webpackPlugin/Desolation');
const getEntries = require('./webpackPlugin/getEntries');

console.log(JSON.stringify(getEntries('webApp/Views'), null, 4));


module.exports = {
  entry: getEntries('webApp/Views'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash:5].js',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './webApp/Components'),
      containers: path.resolve(__dirname, './webApp/Container'),
      Redx: path.resolve(__dirname, './webApp/Redx'),
      static: path.resolve(__dirname, './static'),
    },
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'webApp')],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /View\.jsx?$/,
        // include: path.resolve(__dirname, 'webApp/View'),
        use: [
          {
            loader: 'bundle-loader',
            options: {
              lazy: true,
              name: 'lazy-router'
            },
          },
        ],
      },
      {
        test: /\.jsx$|\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path]-[name]-[local]-[hash:base64:5]',
            },
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()], // eslint-disable-line global-require
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()],
            },
          },
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 64,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new CompressionPlugin(),
    new HtmlWebpackPlugin({
      title: 'manage output',
      template: './template.html',
    }),
    new CleanWebpackPlugin(['dist']),
    new Nyanprogresswebpackplugin(),
    new Watch(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
  ],
  devtool: 'inline-source-map',
  // target: 
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    port: 8088,
    host: '0.0.0.0',
    compress: true,
    stats: {
      warning: true,
      colors: true,
    },
    // publicPath: '/assets/',
    proxy: {
      '/api/taici/name': {
        target: 'https://zhaiyan.2cys.com',
        secure: false,
        changeOrigin: true,
        // bypass: function (req, res, proxyOptions) {
        //   // console.log(req, res, proxyOptions);
        // },
      }
    }
  },
  externals: {
    jquery: 'window.$',
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    'react-router': 'window.ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'react-redux': 'window.ReactRedux',
    redux: 'window.Redux',
  },
  performance: {
    hints: 'warning',
  },
  // stats: {}
};
