const resolve = require("path").resolve;
const webpackMerge = require("webpack-merge")
const config = require("./webpack.common");

const devConfig = {
    mode: "development",
    devServer: {
        contentBase: resolve(__dirname, "dist"),
        historyApiFallback: true,
        watchContentBase: true,
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: true
        },
        port: 10001,
        proxy: {
            "/api": {
                changeOrigin: true,
                target: "http://localhost:3000"
            }
        },
    },
    devtool: "source-map"
}

module.exports = webpackMerge(config, devConfig);
