const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackFavicons = require("webpack-favicons");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/scripts/index.js"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "js/[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    new WebpackFavicons({
      src: path.resolve(__dirname, "../src/images/pika.webp"),
      path: 'images',
      background: '#000',
      theme_color: '#000',
      icons: {
        favicons: true
      }
    }),
  ],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        type: "asset",
      },
    ],
  },
};
