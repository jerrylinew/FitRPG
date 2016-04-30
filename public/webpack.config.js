var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: APP_DIR + '/index.jsx', 
    /* entry specifies the entry file using which the bundling process starts. 
     * similar to the class that contains the main method */
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    // Tell webpack to use the babel-loader while bundling the files
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }
        ]
    }
};

module.exports = config;


