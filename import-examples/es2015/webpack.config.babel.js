const config = {
	entry:{
		'index-compiled': `${__dirname}/index.js`,
	},
	output: {
		path: `${__dirname}`,
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
