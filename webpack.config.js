const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        index: ['./src/views/js/index.js'],
        // newEntry: ['./src/views/js/login/jquery.min.js'],
    },
       output: {
        clean: true,
        filename: './views/js/[name].js',
        path: path.resolve(__dirname, './dist/'),
        publicPath : '',
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
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
            }
            ,
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets:['@babel/preset-env']
                }
                
            }
        ]
    },

    optimization: {},

    plugins: [
        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/servidor.js", to: "servidor.js" },
                { from: "src/router.js", to: "router.js" },
                { from: "src/views/img", to: "views/img" },
                { from: "src/views/css", to: "views/css" },
                { from: "src/views/assets", to: "views/assets" },
                { from: "src/views/templates", to: "views/templates" },
                { from: "src/controllers", to: "controllers" }
            ],
        })
    ]
}