module.exports = ( env, argv ) => {

    let config = {
        entry: './src/typescript/index.ts',
        output: {
            filename: 'babylon-zero-v0.2.1.js',
            path: __dirname + '/dist/js/',
        },
        resolve: {
            // add '.ts' and '.tsx' as resolvable extensions.
            extensions: [
                '.ts',
                '.tsx',
                '.js',
                '.json',
            ],
        },
    };

    // enable sourcemaps for debugging webpack's output.
    if ( argv.mode === 'development' ) {
        config.devtool = 'source-map';
        // config.devtool = 'eval-cheap-source-map';
    }

    config.module = {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },

            // all output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },

            // all '.css' files will be handled by the style- and css-loader
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },

            // all '.less' files will be handled by the style- and css-loader
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap:         true,
                            // relativeUrls:      false,
                            // javascriptEnabled: true,
                        },
                    },
                ],
            },
        ],
    };

    if ( argv.mode === 'production' ) {
        config.optimization = {
            minimize: true,
        };
    }

    config.externals = {
        'cannon':        'CANNON',
        'earcut':        'earcut',
        'babylonjs':     'BABYLON',
        'babylonjs-gui': 'BABYLON.GUI',
    };

    config.devServer = {
        host: 'localhost',
        port: 1234,
        watchContentBase: true,
        publicPath: '/js/',
        contentBase: __dirname + '/dist/',
    };

    return config;
};
