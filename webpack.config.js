var Path= require('path'),
		webpack= require('webpack'),
		ExtractTextPlugin= require('extract-text-webpack-plugin');

var config = {
	devtool: false,
  entry: {
    vendors: ['jquery'],
    indexBundle:[
      Path.resolve(__dirname, './public/sources/scripts/indexBoot')
    ]
  },
  output: {
    path: Path.resolve(__dirname, 'public/'),
		filename: 'js/mywebsite/[name].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      { test: /\.scss$/, loader : ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?includePaths[]=' +
        Path.resolve(__dirname, './node_modules/compass-mixins/lib'))},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      // {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      // {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
    ]
  },
  plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery'
    }),
		new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('css/mywebsite.css')
  ]
};

module.exports = config;
