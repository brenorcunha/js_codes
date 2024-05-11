// Generated using webpack-cli https://github.com/webpack/webpack-cli

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        hashFunction:'sha512'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new NodePolyfillPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
			{
				use: [NodePolyfillPlugin.plugin]
			}

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
        resolve: {
            fallback: {
              fs: false,
              'stream': require.resolve('stream-browserify'),
              'axios': require.resolve('axios'),
              'buffer': require.resolve('buffer/'),
              'util': require.resolve('util/'),
              'assert': require.resolve('assert/'),
              'http': require.resolve('stream-http/'),
              'url': require.resolve('url/'),
              'https': require.resolve('https-browserify/'),
              "path": require.resolve("path-browserify"),
              "os": require.resolve("os-browserify"),
              "crypto": require.resolve("crypto-browserify")
            },
            extensions: ['.html','.jsx']
          }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};