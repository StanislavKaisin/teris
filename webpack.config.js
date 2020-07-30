const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === "development";
const isProduction = !isDev;

const filename = (extension) =>
  isDev ? `[name].${extension}` : `[name].[hash].${extension}`;

const cssLoaders = (addition) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: isDev ? true : false, reloadALL: true },
    },
    "css-loader",
  ];
  if (addition) {
    loaders.push(addition);
  }
  return loaders;
};

const plugins = () => {
  const base = [
    //compile new html file with necessary scripts
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: { collapseWhitespace: isProduction ? true : false },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: filename("css") }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       // from: path.resolve(__dirname, "src/webpack/assets/favicon.ico"),
    //       // to: path.resolve(__dirname, "dist"),
    //     },
    //   ],
    // }),
  ];
  if (isProduction) {
    base.push(new BundleAnalyzerPlugin());
  }
  return base;
};

const optimization = () => {
  const config = {
    splitChunks: { chunks: "all" },
  };
  if (isProduction) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
  }
  return config;
};

const babelOptions = (preset = null) => {
  const options = {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
        },
      ],
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-async-to-generator",
      "syntax-async-functions",
      "@babel/plugin-transform-runtime",
    ],
  };
  if (preset) {
    options.presets.push(preset);
  }
  return options;
};
const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: babelOptions(),
    },
  ];
  if (isDev) {
    loaders.push("eslint-loader");
  }
  return loaders;
};
// console.log("isDev=", isDev);

module.exports = {
  context: path.resolve(__dirname, "src"), // set root folder for source files
  mode: "development",
  entry: {
    tetris: "./index.js",
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@models": path.resolve(__dirname, "src/webpack/models"),
      "@": path.resolve(__dirname, "src/webpack"),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev ? true : false,
    open: true,
  },
  devtool: isDev ? "source-map" : "",
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: babelOptions(["@babel/preset-typescript"]),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: babelOptions(["@babel/preset-react"]),
        },
      },
    ],
  },
};
