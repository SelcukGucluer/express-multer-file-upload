var express = require('express');
var path = require('path');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')))

// routes

var upload = require('./Routers/upload')

app.use('/upload', upload)

app.get('/', function (req, res) {
    res.sendFile('index.html');
});



var server = app.listen(3000, function () {
    var host = server.address().address,
        port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
