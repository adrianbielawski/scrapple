const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'src/js'),
      'node_modules'
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:3]',
                exportLocalsConvention: 'dashes',
              },
            },
          },
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'cheap-module-eval-source-map',
};