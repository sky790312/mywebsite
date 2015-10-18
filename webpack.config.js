var Path= require('path'),
		webpack= require('webpack'),
		ExtractTextPlugin= require('extract-text-webpack-plugin');

module.exports = {
	devtool: false,
  entry: {
    indexBundle:[
      Path.resolve(__dirname, './public/sources/scripts/indexBoot')
    ]
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
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('css/mywebsite.css')
  ]
};
