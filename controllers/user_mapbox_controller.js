'use strict'

var User = require('../models/user_model');
var mapbox = require('./helper/request_api_mapbox');

var controller = {

// Read mapbox coordinates - return one user mapbox coordinates from the database.    

    findOne_mapbox: (req, res) => {
  
        User.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });            
            }
            
            return user;
        })    
         .then(async function (user) 
            {   
                let mapbox_response = await mapbox.connect_mapbox(user.adress)              

                return res.status(200).send({
                    user,
                    mapbox_response 
                });
            })          
        .catch(error => {
            if(error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id
            });
        });   
    } 
    
} // end controller

module.exports = controller;