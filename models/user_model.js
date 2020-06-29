'use strict'

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var UserSchema = Schema({

    id: Number,
    name: String,
    dob: String,
    address: String,
    description: String
}, {
    //{timestamps: true} adds createdAt and updatedAt properties
    timestamps: true   
});

module.exports = mongoose.model('User', UserSchema);


