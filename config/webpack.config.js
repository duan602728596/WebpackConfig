/* webpack配置 */
const process = require('process');
const webpack = require('webpack');
const manifest = require('../.dll/manifest.json');

function config(options){
  const conf = {
    module: {
      rules: [
        { // react & js
          test: /^.*\.js$/,
          use: [
            {
              loader: 'happypack/loader',
              options: {
                id: 'babel_loader'
              }
            }
          ],
          exclude: /(dll\.js|node_modules)/
        },
        {
          test: /dll\.js/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'script/[name]_[hash].[ext]'
              }
            }
          ]
        },
        { // 图片
          test: /^.*\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 3000,
                name: 'image/[name]_[hash].[ext]'
              }
            }
          ]
        },
        { // 图标
          test: /^.*\.ico$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        },
        { // 矢量图片 & 文字
          test: /^.*\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'file/[name]_[hash].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // 公共模块
      /*
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      */
      // 范围提升
      new webpack.optimize.ModuleConcatenationPlugin(),
      // dll
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: manifest
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  };

  /* 合并 */
  conf.entry = options.entry;                                               // 合并入口文件
  conf.module.rules = conf.module.rules.concat(options.module.rules);       // 合并rules
  conf.plugins = conf.plugins.concat(options.plugins);                      // 合并插件
  conf.output = options.output;                                             // 合并输出目录
  if('devtool' in options){                                                 // 合并source-map配置
    conf.devtool = options.devtool;
  }

  return conf;
}

module.exports = config;