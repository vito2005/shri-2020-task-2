const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'linter.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
