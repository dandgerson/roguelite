const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.page = ({ title, template }) => ({
  plugins: [
    new HtmlWebpackPlugin({
      title,
      template,
    }),
  ],
})

exports.extractCss = ({ options = {}, loaders = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [{ loader: MiniCssExtractPlugin.loader, options }, { loader: 'css-loader' }].concat(
          loaders,
        ),
        exclude: /\.m\.(sa|sc|c)ss$/i,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
})

exports.extractCssModules = ({ options = {}, loaders = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.m\.(sa|sc|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]--[hash:base64:3]',
                // auto: /\.m\.\w+$/i,
              },
            },
          },
        ].concat(loaders),
        sideEffects: true,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.WatchIgnorePlugin({
      paths: [/\.m\.(sa|sc|c)ss\.d\.ts$/],
    }),
  ],
})

exports.sassLoader = (options = {}) => ({
  loader: 'sass-loader',
  options,
})

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: { plugins: [require('autoprefixer')()] },
  },
})

exports.loadImages = ({ limit }) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
})

exports.loadResources = () => ({
  module: {
    rules: [
      {
        test: /\.(xml)$/,
        type: 'asset/resource',
      },
    ],
  },
})

exports.loadJs = () => ({
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.join(__dirname, './src'),
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
    ],
  },
})
