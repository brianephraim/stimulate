var path = require('path');
var webpack = require('webpack');
console.log(path);
module.exports = {
	entry: {
		"example/index": './example/example.js',

		// Why am I using an array below? 
		// because: 
		//	Error: a dependency to an entry point is not allowed
		// Workaround:
		//	https://github.com/webpack/webpack/issues/300
		"../dist/index": ['./modules/index.js'],
	},
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/assets/",
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
		          presets: ['es2015']
		        }
			}
		]
	}
};