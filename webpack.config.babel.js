import webpack from 'webpack';
import jsonImporter from 'node-sass-json-importer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';
// env comes from package.json's scipts item property mode arguments
import { argv } from 'yargs';
import packageJson from './package.json';

import StringReplacePlugin from 'string-replace-webpack-plugin';

let username = null;
if (packageJson.repository && packageJson.repository.url) {
	username = packageJson.repository.url.replace('://').split('/')[1];
}

const libraryName = packageJson.name;

const plugins = [];
const pluginRegistry = {};
function registerPlugin(name, plugin) {
	if (!pluginRegistry[name]) {
		plugins.push(plugin);
		pluginRegistry[name] = true;
		return true;
	}
	return false;
}

function conditionalExtractTextLoaderCss(usePlugin, argArray) {
	if (usePlugin) {
		registerPlugin('ExtractTextPlugin', new ExtractTextPlugin('[name].css'));
		return { loader: ExtractTextPlugin.extract(...argArray) };
	}
	return { loaders: argArray };
}

const env = argv.env;

const entry = {};
const entryFiles = {
	library: `${__dirname}/src/library/index.js`,
	demo: `${__dirname}/src/demo/demo.js`,
};
const outputFiles = {};
if (env === 'build') {
	outputFiles.library = `dist/${libraryName}`;
	outputFiles.libraryMin = `dist/${libraryName}.min`;
	outputFiles.demo = 'demo/index';
} else if (env === 'watch') {
	outputFiles.demo = 'src/demo/demo';
	outputFiles.library = `${libraryName}`;
}
// Why am I using an array below?
// because for dev:
//  Error: a dependency to an entry point is not allowed
// Workaround:
//  https://github.com/webpack/webpack/issues/300
entry[outputFiles.library] = [entryFiles.library];
entry[outputFiles.libraryMin] = [entryFiles.library];
entry[outputFiles.demo] = [entryFiles.demo];

if (env === 'build') {
	registerPlugin('UglifyJsPlugin', new webpack.optimize.UglifyJsPlugin({
		include: /\.min\.js$/,
		minimize: true,
	}));
	registerPlugin('ejstest-HtmlWebpackPlugin', new HtmlWebpackPlugin({
		chunks: [outputFiles.demo],
		filename: './demo/index.html',
		template: 'src/demo/index.ejs',
		title: 'afasdfasdfasd',
	}));
	registerPlugin('ejstestxx-HtmlWebpackPlugin', new HtmlWebpackPlugin({
		chunks: [outputFiles.demo],
		filename: './index.html',
		template: 'src/demo/index.ejs',
		title: 'afasdfasdfasd',
		username,
		libraryName,

	}));
} else {
	registerPlugin('demo-HtmlWebpackPlugin', new HtmlWebpackPlugin({
		chunks: [outputFiles.demo],
		filename: './demo/index.html',
	}));
}
plugins.push(new StringReplacePlugin())

const config = {
	entry,
	devtool: 'source-map',
	output: {
		path: `${__dirname}`,
		filename: '[name].js',
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
		// publicPath: '/assets/',
	},
	module: {
		loaders: [
			{
				test: /(\.jsx|\.js)$/,
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
				...conditionalExtractTextLoaderCss(env === 'build', [
					'style-loader',
					'css-loader',
				]),
				// loaders: ['style-loader','css-loader'],
				// loader: 'style-loader!css-loader',
			},
			{
				test: /\.scss$/,
				...conditionalExtractTextLoaderCss(env === 'build', [
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
			{
				test: /\.ejs$/,
				loader: 'ejs-compiled',
			},
			{
				test: /\.md/,
				loaders: ['html', 'markdown'],
			},
			{ 
            test: /\.js|\.html|\.ejs$/,
            loader: StringReplacePlugin.replace({
                replacements: [
                    {
                        pattern: /LIBRARYNAME/g,
                        replacement: function (match, p1, offset, string) {
                        	console.log('zxcvzxcv');
                            return 'qqqqqqqqqqq';
                        }
                    }
                ]})
            },
			// {
			//   test: /(\.jsx|\.js)$/,
			//   loader: "eslint-loader",
			//   exclude: /node_modules/
			// }
		],
	},
	sassLoader: {
		importer: jsonImporter,
	},
	resolve: {
		root: path.resolve('./src/library'),
		extensions: ['', '.js'],
	},
	plugins,
};

module.exports = config;
