import webpack from 'webpack';
import jsonImporter from 'node-sass-json-importer';
import path from 'path';
// env comes from package.json's scipts item property mode arguments
import { argv } from 'yargs';
import packageJson from './package.json';
const env = argv.mode;
const libraryName = packageJson.name;

const plugins = [];
let outputFile;
const entry = {};

if (env === 'build') {
	plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
	outputFile = `${libraryName}.min.js`;
} else {
	entry['demo/index.js'] = './demo/demo.js';
	outputFile = `${libraryName}.js`;
}
// Why am I using an array below?
// because for dev:
//  Error: a dependency to an entry point is not allowed
// Workaround:
//  https://github.com/webpack/webpack/issues/300
entry[outputFile] = [`${__dirname}/src/index.js`];


const config = {
	entry,
	devtool: 'source-map',
	output: {
		path: `${__dirname}/dist`,
		filename: '[name]',
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
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
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
		root: path.resolve('./src'),
		extensions: ['', '.js'],
	},
	plugins,
};

module.exports = config;
