/** @module API routes public */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const Validator = require('../validation/user');
var jwt = require('jsonwebtoken');
const path = require('path');

/**
@function
@name GET /auth
@type json
@description
GET /auth route, returns the enviorments user and pass for HTTP basicAuth
*/
router.get('/auth', function(req,res,next) {
	res.send({user: process.env.API_USER, pass: process.env.API_PASS});
});

/**
@function
@name GET /db_users
@type json
@description
GET /db_users route, returns the number of users registered in connnected mongodb
*/
router.get('/db_users', function(req,res,next) {
	User.count({}, function( err, count){
		res.send({users: count});
	});
});

/**
@function
@name GET /
@description
GET / index page of API
*/
router.get('/', function(req,res,next) {

	res.sendFile(path.join(__dirname+'/root.html'));

});


module.exports = router;
