const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',

    entry: {
        index: ['./src/views/js/index.js'],
        // newEntry: ['./src/views/js/entryName.js']
    },
    output: {
        clean: true,
        filename: './views/js/[name].js',
        path: path.resolve(__dirname, './dist/')
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }            
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/servidor.js", to: "servidor.js" },
                { from: "src/router.js", to: "router.js" },
                { from: "src/views/img", to: "views/img" },
                { from: "src/views/css", to: "views/css" },
                { from: "src/views/assets", to: "views/assets/" },
                { from: "src/views/templates", to: "views/templates" },
                { from: "src/controllers", to: "controllers" }
            ],
        })
    ]
}