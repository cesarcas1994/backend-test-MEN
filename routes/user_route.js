'use strict'

var express = require('express');
var UserController = require('../controllers/user_controller');
var User_mapbox_Controller = require('../controllers/user_mapbox_controller');

var router = express.Router();

//routes for users
router.post('/users', UserController.create);
router.get('/users', UserController.findAll);
router.get('/users/:id', UserController.findOne);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

//extra routes
router.get('/users/mapbox/:id', User_mapbox_Controller.findOne_mapbox);

module.exports = router;