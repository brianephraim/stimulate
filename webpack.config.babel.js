import webpack from 'webpack';
import jsonImporter from 'node-sass-json-importer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
// env comes from package.json's scipts item property mode arguments
import { argv } from 'yargs';
import packageJson from './package.json';
const env = argv.mode;
const libraryName = packageJson.name;

const plugins = [new ExtractTextPlugin('[name].css')];
const outputFiles = {};
const entry = {};
if (env === 'build') {
	plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
	outputFiles.library = `dist/${libraryName}.min`;
	outputFiles.demo = 'demo/index';
} else {
	outputFiles.demo = 'src/demo/demo';
	outputFiles.library = `${libraryName}`;
}

function conditionalExtractTextLoader(usePlugin, argArray) {
	if (usePlugin) {
		return { loader: ExtractTextPlugin.extract(...argArray) };
	}
	return { loaders: argArray };
}
// Why am I using an array below?
// because for dev:
//  Error: a dependency to an entry point is not allowed
// Workaround:
//  https://github.com/webpack/webpack/issues/300
entry[outputFiles.library] = [`${__dirname}/src/library/index.js`];
entry[outputFiles.demo] = [`${__dirname}/src/demo/demo.js`];


const config = {
	entry,
	devtool: 'source-map',
	output: {
		path: `${__dirname}`,
		filename: '[name].js',
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
		publicPath: '/assets/',
	},
	module: {
		loaders: [
			{
				// test: /(\.jsx|\.js)$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ['es2015'],
					// "plugins": ["babel-plugin-add-module-exports"]
				},
			},
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015'],
					// "plugins": ["babel-plugin-add-module-exports"]
				},
			},
			{
				test: /\.css$/,
				...conditionalExtractTextLoader(env === 'build', [
					'style-loader',
					'css-loader',
				]),
				// loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
				// loaders: ['style-loader','css-loader'],
				// loader: 'style-loader!css-loader',
			},
			{
				test: /\.scss$/,
				// ...conditionalExtractTextLoader(['style', 'css?sourceMap', 'sass?sourceMap'], env === 'build'),
				...conditionalExtractTextLoader(env === 'build', [
					'style-loader',
					'css-loader?sourceMap!sass-loader?sourceMap',
				]),
				// loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
				// loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
			},
			{
				test: /\.json$/,
				loaders: ['json'],
			},
			// {
			//   test: /(\.jsx|\.js)$/,
			//   loader: "eslint-loader",
			//   exclude: /node_modules/
			// }
		],
	},
	sassLoader: {
		data: '$asdf: 5px;',
		importer: jsonImporter,
	},
	resolve: {
		root: path.resolve('./src/library'),
		extensions: ['', '.js'],
	},
	plugins,
};

module.exports = config;
