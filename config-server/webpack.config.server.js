/* webpack配置 */
const path = require('path');
const process = require('process');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const babelConfig = require('./babel.config');
const cssConfig = require('./css.config');
const sassConfig = require('../config/sass.config');
const postCssConfig = require('../config/postcss.config');

function config(){
  const { NODE_ENV } = process.env;
  const isDevelopment = NODE_ENV === 'development';
  const fileName = isDevelopment ? '[name].[ext]' : '[hash:5].[ext]';
  const conf = {
    mode: NODE_ENV,
    devtool: isDevelopment ? 'cheap-module-source-map' : 'none',
    entry: {
      server: [path.join(__dirname, '../src/appServer.js')]
    },
    output: {
      path: path.join(__dirname, '../build-server'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
      library: '[name]',
      libraryTarget: 'umd'
    },
    target: 'node',
    node: {
      __filename: true,
      __dirname: true
    },
    module: {
      rules: [
        { // js
          test: /^.*\.js$/,
          use: [babelConfig],
          exclude: /(dll\.js|node_modules)/
        },
        { // vue
          test: /^.*\.vue$/,
          use: ['vue-loader']
        },
        { // sass
          test: /^.*\.s(a|c)ss$/,
          use: [cssConfig, postCssConfig, sassConfig]
        },
        { // css
          test: /^.*\.css$/,
          use: ['css-loader/locals']
        },
        { // 图片
          test: /^.*\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: fileName,
                    outputPath: 'image/',
                    emitFile: false
                  }
                }
              }
            }
          ]
        },
        { // 矢量图片 & 文字
          test: /^.*\.(eot|svg|ttf|woff2?)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: fileName,
                outputPath: 'file/',
                emitFile: false
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  };

  if(!isDevelopment){
    conf.optimization = {
      minimizer: [new TerserPlugin()]
    };
  }

  return conf;
}

module.exports = config();