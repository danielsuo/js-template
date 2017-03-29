var http = require('http');
var express = require('express');
var bulk = require('bulk-require');
var utils = require('./utils');

var app = express();

var modules = bulk(__dirname, ['modules/**/*']).modules;

// http://api.openweathermap.org/data/2.5/weather?q=London&appid=f09da0810493e199a49a8165ee9b763c
// http://localhost:8000/module=openweathermap&q=London&appid=f09da0810493e199a49a8165ee9b763c
app.get('/*', function(req, res) {
  var params = utils.parseQueryString(req.url.substring(1));
  var module = modules[params.module];

  console.log(module)

  var options = {
    host: module.base,
    path: module.pathify(params)
  };

  http.get(options, function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      // console.log(response)
      res.send(module.parse(str));
    });
  });
});

module.exports = app;
