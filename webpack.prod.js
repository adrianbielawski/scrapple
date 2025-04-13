const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const basename = "/";

module.exports = merge(common, {
  mode: "production",
  output: {
    publicPath: basename,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      base: basename,
    }),
    new DefinePlugin({
      "process.env.PUBLIC_URL": JSON.stringify(basename),
      "process.env.API_URL": JSON.stringify(
        "https://scrapple.adrian.bielaw.ski/api",
      ),
      "process.env.WS_URL": JSON.stringify(
        "wss://scrapple.adrian.bielaw.ski/ws",
      ),
    }),
  ],
});
