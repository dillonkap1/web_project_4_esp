const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: "/" ,
        clean: true
    },
    mode: "development",
    devServer: {
        static: [
            { directory: path.resolve(__dirname, "./src") },
            { directory: path.resolve(__dirname, "./dist") }
        ],
        compress: true,
        port: 8080,
        open: true
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: "asset/resource" ,
                generator: {
                    filename: "images/[name][ext][query]"
                }  
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
}
