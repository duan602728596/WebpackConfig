/* 生产环境 */
const path = require('path');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');
const config = require('./webpack.config');
const cssConfig = require('./css.config');
const sassConfig = require('./sass.config');

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

const sassExtractTextPlugin = new ExtractTextPlugin({
  filename: 'style/[name]_[contenthash].css',
  allChunks: true
});

const antdExtractTextPlugin = new ExtractTextPlugin({
  filename: 'style/antd_[contenthash].css',
  allChunks: true
});

/* 合并配置 */
module.exports = config({
  entry: {
    app: path.join(__dirname, '../src/app.js')
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'script/[name]_[chunkhash].js',
    chunkFilename: 'script/[name]_[chunkhash]_chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { // sass
        test: /^.*\.sass$/,
        use: sassExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=sass']
        })
      },
      { // css
        test: /^.*\.css$/,
        use: antdExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=css']
        })
      }
    ]
  },
  plugins: [
    // html模板
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: path.join(__dirname, '../src/index.pug'),
      minify: {
        minifyCSS: true,
        minifyJS: true
      }
    }),
    antdExtractTextPlugin,
    sassExtractTextPlugin,
    new OptimizeCssAssets(),
    new HappyPack({
      id: 'sass',
      loaders: [cssConfig, sassConfig],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'css',
      loaders: ['css-loader'],
      threadPool: happyThreadPool
    })
  ]
});