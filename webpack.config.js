const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = (env) => {
    mode = env.NODE_ENV;
    const configs = {
        entry: path.join(__dirname, 'index.js'),
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    use: 'babel-loader'
                },
                {
                test: /\.css$/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CleanWebpackPlugin(),
        ],
        devServer: {
            port: 3333,
        }
    }
    return configs;
}