const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    entry: './src/frontend/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
    devServer:{
        //Aquí van las configuraciones de dev-server
            hot: true,
            open: true,
            port: 3000
    },
    module:{
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
              },
            },
            {
              test: /\.html$/,
              use: [{
                loader: 'html-loader',
              }],
            },
            {
                test: /\.(s*)css$/,
                use: [
                  { loader: MiniCssExtractPlugin.loader },
                  'css-loader',
                  'sass-loader',
                ],
              }, 
              {
                test:/\.(png|jpg|gif)$/,
                use:[{loader: 'file-loader', options:{
                    name: 'assets/[hash].[ext]'
                }}]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
         new MiniCssExtractPlugin({
            filename: 'assets/[name].css',
        })
    ]
}
