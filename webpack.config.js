var Path= require('path'),
		webpack= require('webpack'),
		ExtractTextPlugin= require('extract-text-webpack-plugin');

var config = {
	devtool: false,
  entry: {
    vendors: ['jquery'],
    indexBundle:[
      Path.resolve(__dirname, './public/sources/scripts/indexBoot')
    ],
		// resultsBundle: [
		// 	Path.resolve(__dirname, './public/sources/scripts/resultsBoot')
		// ],
		// hsrBundle: [
		// 	Path.resolve(__dirname, './public/sources/scripts/hsrBoot')
		// ]
  },
  output: {
    path: Path.resolve(__dirname, 'public/'),
		filename: 'js/mywebsite/[name].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      { test: /.scss$/, loader : ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?includePaths[]=' +
        Path.resolve(__dirname, './node_modules/compass-mixins/lib'))},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.(png|jpg|gif)$/, loader: "file-loader?name=img/img-[hash:6].[ext]"},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=100000&name=img/img-[hash:6].[ext]' }
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
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('css/mywebsite.css')
  ]
};

// config.addVendor('jquery', Path.resolve(__dirname, './public/sources/scripts/indexBoot'));

module.exports = config;
