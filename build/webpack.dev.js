const path = require('path')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，下面react模块热替换
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.resolve(__dirname, '../public'), // 托管静态资源public文件夹
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
})
