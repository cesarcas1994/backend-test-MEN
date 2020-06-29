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

//Route or test method
app.get('/testingget', (req, res) => {

    return res.status(200).send({
      curso: 'Master en Frameworks JS',
      autor: 'Cesar Cas',
      type: 'get' 
    })
    console.log('hi world!');
});

app.post('/testingpost', (req, res) => {

    var user = req.body.user;

    return res.status(200).send({
      curso: 'Master en Frameworks JS',
      autor: 'Cesar Cas',
      type: 'post',
      user_name: user 
    })
    console.log('hi world!');
});

// Export module
module.exports = app;