// node modules
const path = require('path');

// webpack plugin
const webpack = require('webpack');
const Nyanprogresswebpackplugin = require('nyan-progress-webpack-plugin');
const Watch = require('./webpackPlugin/watch');
const notifier = require('node-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// custom plugin
const desolation = require('./webpackPlugin/Desolation');
const getEntries = require('./webpackPlugin/getEntries');

// 删除dist文件夹下的打包文件{
//   application: ['./webApp/Views/index.jsx'],
// }
// desolation('./dist');  getEntries('webApp/Views')
console.log(JSON.stringify(getEntries('webApp/Views'), null, 4));


module.exports = {
  entry: getEntries('webApp/Views'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './webApp/Components'),
      containers: path.resolve(__dirname, './webApp/Container'),
      Redx: path.resolve(__dirname, './webApp/Redx'),
      static: path.resolve(__dirname, 'static'),
    },
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'webApp')],
  },
  module: {
    rules: [
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
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'manage output',
      template: './index.html',
    }),
    new CleanWebpackPlugin(['dist']),
    new Nyanprogresswebpackplugin(),
    new Watch((stats) => {
      const { compilation } = stats;
      const { errors } = compilation;
      console.log(errors);
      if (errors.length !== 0) {
        notifier.notify({
          title: errors[0].name,
          message: errors[0].message,
          sound: 'Submarine',
        });
      } else {
        notifier.notify({
          title: 'webapack success',
          message: `cost ${stats.endTime - stats.startTime}ms`,
        });
      }
    }),
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
    publicPath: '/assets/',
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
    jquery: 'jQuery',
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  performance: {
    hints: 'warning',
  },
  // stats: {}
};
