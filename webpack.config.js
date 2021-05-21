const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const babelLoader = {
  test: /\.js(x)?$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              esmodules: true,
            },
          },
        ],
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
      ],
      plugins: ['babel-plugin-styled-components', 'react-hot-loader/babel'],
    },
  },
}

const stylesLoaders = [
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    exclude: /\.module\.css$/,
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]--[name]-[hash:base64:5]',
          },
          sourceMap: false,
        },
      },
    ],
    include: /\.module\.css$/,
  },
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  },
]

module.exports = {
  mode: 'development',
  entry: ['react-hot-loader/patch', path.join(__dirname, 'src', 'index.tsx')],
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      images: path.resolve(__dirname, 'src/images'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 3000,
    watchContentBase: true,
    progress: true,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      babelLoader,
      ...stylesLoaders,
      {
        test: /\.ts(x)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
    ],
  },
}
