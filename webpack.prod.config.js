var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    WebpackStripLoader = require('strip-loader'),
    stripLoader = {
     test: [/\.js$/, /\.es6$/],
     exclude: /node_modules/,
     loader: WebpackStripLoader.loader('console.log')
    },
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
  loaders: [
    {
      test: /\.scss$/,
      loader: "style-loader!css-loader!postcss-loader"
    },
    stripLoader
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index.compiled.js"
  },
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
    }
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
      mangle: false,
       output: {
          space_colon: false,
          comments: function(node, comment) {
              var text = comment.value;
              var type = comment.type;
              if (type == "comment2") {
                  // multiline comment
                  return /@copyright/i.test(text);
              }
          }
      }
    }),
  ],
  postcss: function () {
      return [precss, autoprefixer];
  }
};