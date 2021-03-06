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
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': 'react-dom',
    qs: {
      root: 'Qs',
      commonjs: 'qs',
      commonjs2: 'qs',
      amd: 'qs'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types'
    },
    lodash: {
      root: '_',
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash'
    },
    '@devexpress/dx-react-core': {
      root: ['DevExpress', 'DXReactCore'],
      commonjs: '@devexpress/dx-react-core',
      commonjs2: '@devexpress/dx-react-core',
      amd: '@devexpress/dx-react-core'
    },
    '@devexpress/dx-react-grid': {
      root: ['DevExpress', 'DXReactGrid'],
      commonjs: '@devexpress/dx-react-grid',
      commonjs2: '@devexpress/dx-react-grid',
      amd: '@devexpress/dx-react-grid'
    }
  }
};
