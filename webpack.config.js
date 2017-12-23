'use strict'

var path = require("path")
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: { filename: 'dist/index.js' },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },

  resolve: {
    extensions: [ '.webpack.js', '.web.js', '.ts', '.tsx', '.js' ],
    modules: [
      'node_modules'
    ],
    alias: {
      config: path.resolve(__dirname, 'src/config/'),
    }
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ],

  node: {
     fs: "empty",
     net: "empty",
  }
}
