const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const basename = "/";

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    webSocketServer: {
      type: "ws",
      options: {
        path: "/webpack-dev-server-websocket",
      },
    },
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:8000",
        secure: false,
        changeOrigin: true,
      },
      {
        context: ["/ws"],
        target: "ws://localhost:8000",
        ws: true,
        secure: false,
        changeOrigin: true,
      },
    ],
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      base: basename,
    }),
    new DefinePlugin({
      "process.env.PUBLIC_URL": JSON.stringify(basename),
      "process.env.API_URL": JSON.stringify("/api"),
      "process.env.WS_URL": JSON.stringify("/ws"),
    }),
  ],
});
