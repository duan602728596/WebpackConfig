/* babel-loader 配置 */
const path = require('path');

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        ie: 11,
        edge: 12,
        chrome: 40,
        firefox: 40
      },
      debug: debug,
      modules: false,
      useBuiltIns: 'usage'
    }
  ],
  '@babel/preset-flow'
];

const plugins = [
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true
    }
  ],
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-do-expressions',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-class-properties',
  "@babel/plugin-syntax-dynamic-import",
  [
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }
  ]
];

module.exports = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: path.join(__dirname, '../.babelCache'),
    presets,
    plugins
  }
};