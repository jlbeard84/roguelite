const copyWebpackPlugin = require("copy-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/main.ts",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node_modules/"
            }
        ]
    },
    resolve: {
        extensions: [ ".ts", ".js" ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new htmlWebpackPlugin({
            hash: true,
            filename: "./index.html",
            title: "Roguelite"
        }),
        new copyWebpackPlugin([
            {
                context: "./src/assets",
                from: "**/*",
                to: "./assets"
            }
        ])
    ]
};