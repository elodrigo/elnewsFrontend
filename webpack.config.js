
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {

    context: __dirname + '/src',
    mode: 'production',
    entry: './app.js',
    output: {
        path: __dirname + '/public',
        filename: 'elnews4.min.js',
        publicPath: "/",
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                // use: [MiniCssExtractPlugin.loader, "css-loader"]
                use: ["style-loader", "css-loader"]

            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },

            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 25000,
                    },
                },
            },
            {
                test: /\.txt$/,
                use: [
                    {
                        loader: "raw-loader"
                    }
                ]
            }

        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebPackPlugin(
            {
            template: "./index.html",
            filename: "./index.html"
        }
        ),
    ]

};
