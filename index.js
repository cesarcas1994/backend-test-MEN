'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

//mongoose.set('useFindAndModify', false);
//mongoose.Promise = global.Promise;

const uri = "mongodb+srv://cesar:cesarcas@cluster0-xcvln.azure.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…");

  //Create server and listen to HTTP requests
  app.listen(port,()=>{
    console.log('Servidor corriendo en http://localhost:'+port);
  });
})
.catch(err => console.log(err))
