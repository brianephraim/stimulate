const dirName = __dirname.replace('/src/import-examples/', /import-examples/);
const config = {
	entry:{
		'index-compiled': `${dirName}/index.js`,
	},
	output: {
		path: `${dirName}`,
		filename: '[name].js',
	},
	module: {
		loaders: [
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
				},
			},
			
		],
	},
};

export default config;
