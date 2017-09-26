var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
        template: './app/index.html',
        filename: 'index.html',
        inject: 'body'
    })

module.exports = {
  entry: [
    './app/index.jsx'
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  output: {
    path: __dirname + '/dist',
    filename: "index.compiled.js"
  },
  debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'app')],
        loader: "babel-loader",
        query: {
            presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!postcss-loader!sass-loader?sourceMap"
      },

      {
        test: /\.jpg|.jpeg|.png|.gif|.svg$/,
        loader: "file?name=images/[name].[ext]"
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    sassLoader: {
      includePaths: [path.resolve(__dirname, "./app/index.scss")]
    },
    eslint: {
      configFile: './.eslintrc',  //your .eslintrc file 
      emitWarning: true
    }
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
  ],
  postcss: function () {
      return [precss, autoprefixer];
  }
}