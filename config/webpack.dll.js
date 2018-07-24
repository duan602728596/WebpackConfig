/* 预先编译dll */
const path = require('path');
const process = require('process');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    dll: [
      'vue/dist/vue',
      'vue-router/dist/vue-router',
      'vuex/dist/vuex'
    ]
  },
  output: {
    path: path.join(__dirname, '../.dll'),
    filename: '[name].js',
    library: '[name]_[hash]',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      { // js
        test: /^.*\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.join(__dirname, '../.babelCache'),
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                      edge: 12,
                      chrome: 40,
                      firefox: 40
                    },
                    debug: false,
                    modules: false,
                    useBuiltIns: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // dll
    new webpack.DllPlugin({
      path: '.dll/manifest.json',
      name: '[name]_[hash]',
      context: __dirname
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};