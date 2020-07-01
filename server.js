'use strict'

const mongoose = require('mongoose');
const uri = "mongodb+srv://cesar:cesarcas@cluster0-xcvln.azure.mongodb.net/test?retryWrites=true&w=majority";

function connect() {
  return new Promise((resolve, reject) => {

    if(process.env.NODE_ENV === 'test'){

      const Mockgoose = require ('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
          .then((res, err) => {
            if(err) return reject(err);
            resolve();
            })
          })
    }else{
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((res, err) => {
        if(err) return reject(err);
        resolve();
      })
    }     
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
