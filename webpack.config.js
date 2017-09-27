const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot-loader", "babel-loader"] },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"]}
        ]
    },
    devServer: {
        setup: function(app){
            app.post('/api/send', function (req, res) {
                // This is a dummy loop to simulate a slow connection.
                for (i = 0; i < 99999999; i++) { }
                res.send({status: 'OK'});
            })
        },
        proxy: {
            '/api/send':'/api/send'
        }
    }
};