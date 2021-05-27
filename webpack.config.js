const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const webpack = require('webpack');
const { TRUE } = require('node-sass');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

require('dotenv').config();

const isDev = (process.env.ENV == "development");
const entry = ['./src/frontend/index.js'];
isDev && entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true');

//public path es muy importante al crear una pagina con rutas dinamicas, esta chingaderita detuvo mi trabajo 3 putos dias.

module.exports = {
    entry,
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'src/server/public'),
      filename: 'assets/app-[contenthash].js',
      publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
    devServer:{
        //Aquí van las configuraciones de dev-server
            hot: true,
            open: true,
            historyApiFallback: true
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'async',
        cacheGroups:{
          vendors:{
            name: 'vendors',
            chunks: 'all',
            reuseExistingChunk: true,
            priority: 1,
            filename: isDev? 'assets/vendor.js' : 'assets/vendor-[contenthash].js',
            enforce: true,
            test(module, chunks) {
              const name = module.nameForCondition && module.nameForCondition();
              return (chunk) => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name);
            },
          }
        }
      }
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
                    name: 'assets/[contenthash].[ext]'
                }}]
            }
        ]
    },
    plugins: [
         new MiniCssExtractPlugin({
            filename: 'assets/app-[contenthash].css',
      }),
       isDev? new webpack.HotModuleReplacementPlugin() : () =>{},
       isDev? () =>{} : new CompressionWebpackPlugin({
         test: /\.js$|\.css$/,
         filename: '[path][base].gz'
      }),
       isDev? () =>{} :  new WebpackManifestPlugin({
        map: f => {
          f.path = f.path.replace(/^auto/,'');
          return f;
        }
       }),
       isDev  ? () => {} : new CleanWebpackPlugin({
       cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'src/server/public')
      })
    ]
}
