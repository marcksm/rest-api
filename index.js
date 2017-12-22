const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const port = process.env.port || 4000
const basicAuth = require('./middleware/auth')
const path = require('path');

/** This is a description of the foo function. */

dotenv.config();
// Set Up express app
const app = express();
app.use(express.static('public'))

/** This is a description of the foo function. */
app.use(cors());
// Connect to mongodb
mongoose.connect(process.env.NODE_ENV == 'dev' ? (process.env.MONGODB_PATH_LOCAL)
:(process.env.MONGODB_PATH_ONLINE),{ useMongoClient: true });

mongoose.Promise = global.Promise;
/** This is a description of the foo function. */

app.use(bodyParser.json());

// Initilize routes
app.use('/', require('./routes/api_public'),function(req, res, next) {

  if (req.url.startsWith('/api')) return next();
  else {
    //res.status(404).send('404 NOT FOUND')
    //res.status(404).render('404.html');
   res.sendFile(path.join(__dirname+'/err404.html'));
  }
});

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
app.use(basicAuth.api);
app.use('/api', require('./routes/api'), function (req, res, next){

//  res.status(404).send('404 NOT FOUND')
 res.sendFile(path.join(__dirname+'/err404.html'));
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
  process.env.NODE_ENV == 'dev' ? (str1 = process.env.MONGODB_PATH_LOCAL)
  :(str1 = process.env.MONGODB_PATH_ONLINE)
  str = 'API on ' + 'http://localhost:'+ port
  console.log(str);
  str2 = 'Mongo DB on ' + str1
  console.log(str2);
});

module.exports = app
