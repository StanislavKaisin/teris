const path = require("path");

module.exports = {
  entry: "./src/webpack/index2.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
