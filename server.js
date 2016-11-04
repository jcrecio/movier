var express = require('express');

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/release/vendor.js')));
app.use(express.static(path.join(__dirname, '/release/app')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/release/app/index.html'));
});

app.listen(8080);