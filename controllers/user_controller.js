'use strict'

var validator = require('validator');
//var moment = require('moment');
var User = require('../models/user_model');

var controller = {

// Create - create and Save a new user

    create: (req,res) =>{

        // Validate Request
        var parameters =  req.body;

        //Validate Request
        try {
            
            var validate_name = validator.isAlpha(parameters.name + '');
            var validate_dob = !validator.isEmpty(parameters.dob + '');
            var validate_address = !validator.isEmpty(parameters.address + '');
            var validate_description = !validator.isEmpty(parameters.description + '');

        } catch (error) {
            
            return res.status(400).send({
                message: error
            });
        }
           
        if(validate_name && validate_dob && validate_address && validate_description){
            
            //Create object to save
            var user = new User();

            //assign values
            user.name = parameters.name;
            user.dob = parameters.dob;
            user.address = parameters.address;
            user.description = parameters.description;

            //save user
            user.save((error, userStored) => {

               if(error || !userStored) {
                return res.status(500).send({
                    message: error.message || "Some error occurred while creating user."
                });
               }

               return res.status(200).send({
                    userStored
                });
            });
        }else{
            
            let name_sintax_error = (validate_name == true) ? '' : ' name need to be string and only letters.';
            let dob_sintax_error = (validate_dob == true) ? '' : ' dob need to be ISO860.';
            let address_sintax_error = (validate_address == true) ? '' : ' address need to be string.';
            let description_sintax_error = (validate_description == true) ? '' : ' description need to be string.';

            const sintax_error = 'Fix data format:' + name_sintax_error + dob_sintax_error + address_sintax_error + description_sintax_error 

            return res.status(400).send({
                message: sintax_error    
            }); 
        }
    },
    
// Read all - return all users from the database.
    
    findAll: (req, res) => {
        User.find()
        .then(users => {
            res.send(users);
        }).catch(error => {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving users."
            });
        });
    },

// Read - return one user from the database.

    findOne: (req, res) => {
        User.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });            
            }
            res.send(user);
        }).catch(error => {
            if(error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id
            });
        });
    },

// Update - update a user identified by the id in the request

    update: (req, res) => {
        // pick parameters
        var parameters =  req.body;

        // Validate Request
        try {

            var validate_name = validator.isAlpha(parameters.name + '') && (parameters.name != null);
            var validate_dob = !validator.isEmpty(parameters.dob + '') && (parameters.dob != null);
            var validate_address = !validator.isEmpty(parameters.address + '') && (parameters.address != null);
            var validate_description = !validator.isEmpty(parameters.description + '') && (parameters.description != null);

        } catch (error) {
            
            return res.status(400).send({
                message: error
            });
        }

        if(validate_name && validate_dob && validate_address && validate_description){

            //Create object to update
            var user = new User();

            //assign values
            user.name = parameters.name;
            user.dob = parameters.dob;
            user.address = parameters.address;
            user.description = parameters.description;

            // Find user and update it with the request body
            User.findByIdAndUpdate(req.params.id, {
                name: user.name,
                dob: user.dob,
                address: user.address,
                description: user.description
            }, {new: true})
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.id
                    });
                }
                res.send(user);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating user with id " + req.params.id
                });
            });
        }else{
            
            let name_sintax_error = (validate_name == true) ? '' : ' name need to be string.';
            let dob_sintax_error = (validate_dob == true) ? '' : ' dob need to be ISO860.';
            let address_sintax_error = (validate_address == true) ? '' : ' address need to be string.';
            let description_sintax_error = (validate_description == true) ? '' : ' description need to be string.';

            const sintax_error = 'Fix data format:' + name_sintax_error + dob_sintax_error + address_sintax_error + description_sintax_error 

            return res.status(400).send({
                message: sintax_error    
            }); 
        }
        
    },

// Delete - delete a user with the specified id in the request

    delete: (req, res) => {
        User.findByIdAndRemove(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.user
                });                
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
    }

}; // end controller

module.exports = controller;