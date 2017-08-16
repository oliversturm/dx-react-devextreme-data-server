const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dx-react-devextreme-data-server-browser.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DXReactDevExtremeDataServer',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [require('babel-plugin-transform-react-jsx')]
          }
        }
      }
    ]
  },
  externals: [
    'react',
    'react-dom',
    'qs',
    'prop-types',
    '@devexpress/dx-react-core'
  ]
};
