const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
    new CleanWebpackPlugin(),
],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'wwwroot/webpack')
  },
     module: {
        rules: [
            { test: /\.handlebars$/,
                loader: "handlebars-loader"
             },
           {
            test: /\.css$/,
            use: [
              'style-loader',
               'css-loader'
             ],
           },
           {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                      'file-loader'
                   ]
            },
            {
                      test: /\.(woff|woff2|eot|ttf|otf)$/,
                      use: [
                       'file-loader'
                       ]
            },
           {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }         
         ]
       }
};