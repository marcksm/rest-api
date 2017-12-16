const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Set Up express app
const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/apithevelops',{ useMongoClient: true });

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// Initilize routes
app.use('/api',require('./routes/api'));

//Error handling
app.use(function(err, req, res, next){

  res.status(422).send({});
});
// Listen for request
app.listen(process.env.port || 4000, function() {
  console.log("Listening...");
});
