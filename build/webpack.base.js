const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const threads = os.cpus().length;
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    publicPath: '/', // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /.(ts|tsx|jsx|js)$/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  workers: threads,
                },
              },
              'babel-loader',
            ],
            include: path.resolve(__dirname, '../src'),
          },
          {
            test: /.css$/,
            use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            include: path.resolve(__dirname, '../src'),
          },
          {
            test: /.less$/,
            use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
            include: path.resolve(__dirname, '../src'),
          },
          {
            test: /.(png|jpg|jpeg|gif|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
            generator: {
              filename: 'static/images/[name].[contenthash:8].[ext]',
            },
          },
          {
            test: /.(woff2?|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/fonts/[name].[contenthash:8].[ext]',
            },
          },
          {
            test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      threads: true,
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslint'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    }),
  ],
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
};
