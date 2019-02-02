const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    main: path.resolve(__dirname, 'src/main.ts')
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.m?(js|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/typescript"
            ],
            "plugins": [
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}

