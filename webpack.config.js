var extend = require('util')._extend;
var webpack = require('webpack');
var jsonImporter = require('node-sass-json-importer');
// import jsonImporter from 'node-sass-json-importer';
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
// env comes from package.json's scipts item property mode arguments
var env = require('yargs').argv.mode;
var packageJson = require("./package.json");
var libraryName = packageJson.name;

var plugins = [];
var outputFile;
var entry = {};


if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
} else {
    entry["example/index.js"] = './example/example.js';
    outputFile = libraryName + '.js';
}
// Why am I using an array below? 
// because for dev: 
//  Error: a dependency to an entry point is not allowed
// Workaround:
//  https://github.com/webpack/webpack/issues/300
entry[outputFile] = [__dirname + '/src/index.js'];


var config = {
    entry: entry,
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: '[name]',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        publicPath: "/assets/",
    },
    module: {
        loaders: [{
                // test: /(\.jsx|\.js)$/,
                loader: 'babel',

                exclude: /(node_modules|bower_components)/,
                query: {
                    "presets": ["es2015"],
                    // "plugins": ["babel-plugin-add-module-exports"]
                }
            }, 
            {
                test: /stimulate\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                query: {
                    "presets": ["es2015"],
                    // "plugins": ["babel-plugin-add-module-exports"]
            }
            }, 
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, 
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            },
            {
                test: /\.json$/,
                loaders: ["json"]
            }
            // {
            //   test: /(\.jsx|\.js)$/,
            //   loader: "eslint-loader",
            //   exclude: /node_modules/
            // }
        ]
    },
    sassLoader: {
	    data: "$asdf: 5px;",
	    importer: jsonImporter
	},
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins: plugins,
};

module.exports = config;
