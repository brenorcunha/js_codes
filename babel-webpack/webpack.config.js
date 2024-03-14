// webpack.config.js
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output:{
    filename: '[name].min.js'
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
}