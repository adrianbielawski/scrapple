const path = require("path");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      path.join(__dirname, "src/js"),
      path.join(__dirname, "assets"),
      "node_modules",
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: () => true,
                localIdentName: "[name]_[local]_[hash:base64:3]",
                exportLocalsConvention: "dashes",
                namedExport: false,
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|mp3)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [new FaviconsWebpackPlugin("./assets/img/icon.png")],
};
