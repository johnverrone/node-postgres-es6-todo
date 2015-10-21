var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./app/routes');

var app = express();

// parsing req/res
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(8000);
console.log('API is running on port 8000');
