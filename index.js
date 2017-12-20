const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const port = process.env.port || 4000
const basicAuth = require('./middleware/auth')



dotenv.config();
// Set Up express app
const app = express();


app.use(cors());
// Connect to mongodb
mongoose.connect(process.env.MONGODB_PATH_LOCAL,{ useMongoClient: true });

mongoose.Promise = global.Promise;


app.use(bodyParser.json());

// Initilize routes
app.use('/', require('./routes/api_public'),function(req, res, next) {

  if (req.url.startsWith('/api')) return next();
  else {
    res.status(404).send('404 NOT FOUND')
  }
});

app.use(basicAuth.api);
app.use('/api', require('./routes/api'), function (req, res, next){

  res.status(404).send('404 NOT FOUND')
 //res.render('404.jade');
});

//Error handling
app.use(function(err, req, res, next){
  if (err.isBoom) {
        return res.status(err.output.statusCode).json(err.output.payload);
   }
  res.status(400).json({err: err.message })
});
// Listen for request
app.listen(port, function() {

  str = 'API on http://localhost:'+ port
  console.log(str);
  str2 = 'Mongo DB on ' + process.env.MONGODB_PATH_LOCAL
  console.log(str2);
});

module.exports = app
