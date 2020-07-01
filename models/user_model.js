'use strict'

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    //{timestamps: true} adds createdAt and updatedAt properties
    timestamps: true   
});

module.exports = mongoose.model('User', UserSchema);


