const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const port = process.env.port || 4000;
const basicAuth = require('./middleware/auth');
const path = require('path');

/**
 Configurating enviorment
 */
dotenv.config();

/**
 Set up express js
 */
const app = express();
app.use(express.static('public'));

/**
 Middleware to use CORS in HTTP requests
 */
app.use(cors());

/**
	Connect to mongodb
 */
mongoose.connect(process.env.NODE_ENV == 'dev' ? (process.env.MONGODB_PATH_LOCAL):(process.env.MONGODB_PATH_ONLINE),{ useMongoClient: true });
mongoose.Promise = global.Promise;

/**
 Middleware to parse response to json
 */
app.use(bodyParser.json());

/**
 Initilize routes without HTTP basic authentication
 */
app.use('/', require('./routes/api_public'),function(req, res, next) {
	if (req.url.startsWith('/api')) return next();
	else {
	 res.sendFile(path.join(__dirname+'/err404.html'));
	}
});

/**
 Set up HTTP basic authentication middleware
 */
app.use(basicAuth.api);

/**
 Initilize routes with HTTP basic authentication
 */
app.use('/api', require('./routes/api'), function (req, res, next){
	res.sendFile(path.join(__dirname+'/err404.html'));
});

/**
	Error handling
 */
app.use(function(err, req, res, next){
	if (err.isBoom) {
		return res.status(err.output.statusCode).json(err.output.payload);
	 }
	 res.status(400).json({err: err.message });
});

/**
 Listen for request
 */
app.listen(port, function() {
	process.env.NODE_ENV == 'dev' ? (str1 = process.env.MONGODB_PATH_LOCAL)	:(str1 = process.env.MONGODB_PATH_ONLINE);
	str = 'API on ' + 'http://localhost:'+ port;
	console.log(str);
	str2 = 'Mongo DB on ' + str1;
	console.log(str2);
});

module.exports = app;
