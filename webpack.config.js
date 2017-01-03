var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path:  './public/assets',
    filename: 'bundle.js',
    publicPath:'assets'
  },
  devServer:{
    contentBase:'./public'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader?presets[]=es2015&presets[]=react"]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      }
    ]
  }
};
