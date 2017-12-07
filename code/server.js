var path = require("path"),
    express = require("express"),
    request = require("request");

var DIST_DIR = path.join(__dirname, "../result"),
    PORT = 3000,
    app = express();
console.log('env', process.env.NODE_ENV);
//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("/", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.get('/feedCards', function(req, res, next){
    const options = {
        url: 'http://read-api.getinpix.com/en/v1/feed/all_card?first_login=true',
        method: 'get',
        timeout: 30 * 1000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-DEVICE-ID': parseInt(Math.random() * 1000),
            'X-OS-TYPE': 'web',
            'X-AUTH-TOKEN': 'Vm10S1MyRXlXbE5UTTBaNFUyMXdhMVF3VGtaVVp6MDk=',
        },
        qs: {
            first_login: true,
        },
        json: {}
    };

    request(options, function(err, resp, body) {
        res.send(body);
    });

});

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    //const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config.js');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        stats: { colors: true },
        //noInfo: false,
        //lazy: false,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost"
        }
        //publicPath: config.output.publicPath
    }));
    //app.use(webpackHotMiddleware(compiler));

}

app.listen(PORT, function () {
    console.log('The server is running at http://localhost:' + PORT);
});