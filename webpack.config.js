module.exports = {
	entry: __dirname + '/src',
	output: {
		path: '/',
	    filename: 'bundle.js'
	},
	devtool: 'source-maps',
	module:{
		loaders:[
			{
				test: /\.js$/,
				loader: 'babel',
				query:{
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.less/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|ttf)/,
        loader: 'file-loader'
      }
		]
	}
};
