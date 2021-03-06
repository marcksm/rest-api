/** @module API routes private */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const Validator = require('../validation/user');
var jwt = require('jsonwebtoken');

/**
@function
@name POST api/authenticate
@type json
@description
POST api/authenticate route, returns user in json if success or error 400
 */
router.post('/authenticate', function(req,res,next) {
	const user_auth = req.body;
	User.findOne({ email: req.body.email}).then(function (user) {
		if (user && user.isValidPassword(req.body.password)) {
			res.json({user: user.tojson()});
		}
		else {
			res.status(400).json({errors: {global: "Email or password invalid"}});
		}
	});
});

/**
@function
@name GET api/users
@type json
@description
GET api/users route, returns a json list of users
 */
router.get('/users', function(req,res,next) {
	User.find({}).then(function(users){
		res.send(users);
	}).catch(next);
});

/**
@function
@name POST api/users
@type json
@description
POST api/users add a new user to database, return user if success or 400 error
*/
router.post('/users', expressJoi(Validator.SignUp), function(req, res, next) {
	var pre = req.body;
	pre.password = bcrypt.hashSync(req.body.password, 10);
	var user = new User(pre);
	user.save().then(function(user){
		res.send({user: user.tojson()});
	}).catch(next);
});

/**
@function
@name GET api/users/:id
@type json
@description
GET api/users/:id gets a specific user in database, return user if success or 400 error
*/
router.get('/users/:id', expressJoi(Validator.GetUser), function(req, res, next) {
	User.findOne({_id: req.params.id}).then(function (user) {
		res.json({user: user.tojson()});
	}).catch(next);
});

/**
@function
@name PUT api/users/:id
@type json
@description
PUT api/users/:id update a user in the database, if success return json success true, otherwise 400 error
*/
router.put('/users/:id', expressJoi(Validator.User), function(req,res,next) {
	User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		User.findOne({_id: req.params.id}).then(function (user) {
			res.json({ success: true });
		});
	}).catch(next);
});

/**
@function
@name PUT api/users/:id/edit
@type json
@description
PUT api/users/:id/edit update for edit user field in react app, if success return json success true, otherwise 400 error
*/
router.put('/users/:id/edit',expressJoi(Validator.EditUser), function(req,res,next) {
	User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		User.findOne({_id: req.params.id}).then(function (user) {
			res.json({ success: true });
		});
	}).catch(next);
});

/**
@function
@name PUT api/users/:id/reset_password
@type json
@description
PUT api/users/:id/reset_password update only password field in react app, if success return json success true, otherwise 400 error
*/
router.put('/users/:id/reset_password', expressJoi(Validator.ResetPassword), function(req,res,next) {
	var pass = bcrypt.hashSync(req.body.password, 10);
	var userss = User.findOne({_id: req.params.id});
	userss.then(function (user) {
		expressJoi(Validator.ResetPassword);
		if (bcrypt.compareSync(req.body.old_password, user.password)){
			User.findOneAndUpdate({_id: req.params.id},{$set: {password: pass}}).then(function(){
				User.findOne({_id: req.params.id}).then(function (user) {
					res.json({ success: true });
				});
			}).catch(next);
		} else {
			res.status(404).json ({ success: false });
		}
	});
});

/**
@function
@name DELETE api/users/:id
@type json
@description
DELETE  api/users/:id delete a user from the database, if success return json success
true otherwise json success false
*/
router.delete('/users/:id', expressJoi(Validator.GetUser), function(req,res,next) {
	User.findByIdAndRemove({_id: req.params.id}, function(err, user){
		if (user) {
			res.json({ success: true });
		}
		else {
			res.json({ success: false });
		}
	}).catch(next);
});


module.exports = router;
