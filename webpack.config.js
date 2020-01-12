const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'linter.js',
    path: path.resolve(__dirname, 'build')
  }
}
