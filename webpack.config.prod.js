const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',

  context: path.resolve(__dirname, 'src'),

  entry: './ts/app.ts',

  output: {
    filename: 'js/main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },

  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
      },
      {
        directory: __dirname,
        publicPath: '/',
      },
    ],

    open: {
      app: {
        name: 'Google Chrome',
        // arguments: ["--incognito", "--new-window"],
      },
    },
    port: 8420,
    hot: true,
    compress: true,
    watchFiles: ['src/**/*'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: false,
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '/src', 'index.html'),
      minify: true,
      inject: 'body',
    }),
  ],

  resolve: {
    extensions: ['.ts', '.js'],
  },
};
