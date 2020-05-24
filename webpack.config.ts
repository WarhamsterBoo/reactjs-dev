import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      shared: path.resolve(__dirname, "src/components/Shared/index"),
      styles: path.resolve(__dirname, "src/styles"),
      components: path.resolve(__dirname, "src/components"),
      api: path.resolve(__dirname, "src/api"),
      hoc: path.resolve(__dirname, "src/hoc"),
      screens: path.resolve(__dirname, "src/screens"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

export default config;
