const resolve = require("path").resolve
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

const Stylish = require("webpack-stylish");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: ["@babel/polyfill", "./src/index.jsx"],
    stats: "none",
    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.[hash].js",
    },
    resolve: {
        modules: ["node_modules", "./src"],
        extensions: [".js", ".jsx", ".css",]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    /node_modules/,
                ],    
                loaders: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.scss$|\.css$/,
                loaders: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "style-resources-loader",
                        options: {
                            patterns: [
                                resolve(__dirname, "./src/Styles/res/_index.scss"),
                            ]
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new StyleLintPlugin({
            emitWarning: true,
            files: "**/*.css|**/*.scss"
        }),
        new MiniCssExtractPlugin({
            filename: "style.[hash].css",
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: "./favicon.ico"
        }),
        new webpack.NamedModulesPlugin(),
        new Stylish()
    ]
};

