'use strict'

var express = require('express');
var UserController = require('../controllers/user_controller');

var router = express.Router();

//routes for articles
router.post('/users', UserController.create);
router.get('/users', UserController.findAll);
router.get('/users/:id', UserController.findOne);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);


module.exports = router;