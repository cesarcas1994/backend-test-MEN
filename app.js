'use strict'

// Load node modules to create the server
var express = require('express');
var bodyParser = require('body-parser');

//run express (http)
var app =  express();

//load path files
var user_routes = require('./routes/user_route');

//middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Add prefixes to routes / load route
app.use('/', user_routes);

// Export module
module.exports = app;