const webpackMerge = require("webpack-merge")
const config = require("./webpack.common");
const TerserPlugin = require('terser-webpack-plugin')

var prodConfig = {
    mode: "production",
    performance: { hints: false },
    optimization: {
        minimizer: [ new TerserPlugin({
            parallel: true,
            terserOptions: {
              ecma: 7,
            },
          }),],
    }
}

module.exports = webpackMerge(config, prodConfig);
