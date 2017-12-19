const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const Validator = require('../validation/user')


router.post('/authenticate', function(req,res,next) {
  const {user_auth} = req.body;
  User.findOne({ email: user_auth.email}).then(function (user) {
    if (user && user.isValidPassword(user_auth.password)) {
      res.json({user: user.tojson()});
    }
    else {
      res.status(400).json({errors: {global: "Email or password invalid"}});
    }
  });
});

//GET list of users from the database
router.get('/users', function(req,res,next) {
  User.find({}).then(function(users){
    res.send(users);
  }).catch(next);
});

//POST add a new user to database
router.post('/users', expressJoi(Validator.SignUp), function(req, res, next) {
  var pre = req.body
  pre.password = bcrypt.hashSync(req.body.password, 10);
  var user = new User(pre);
  user.save().then(function(user){
    res.send({user: user.tojson()});
  }).catch(next);
});

//GET a specific user in database
router.get('/users/:id', expressJoi(Validator.GetUser), function(req, res, next) {
  User.findOne({_id: req.params.id}).then(function (user) {
    res.json({user: user.tojson()})
  }).catch(next);
});

//PUT update a user in the database
router.put('/users/:id', expressJoi(Validator.User), function(req,res,next) {
  User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      User.findOne({_id: req.params.id}).then(function (user) {
        res.json({ success: true })
      });
  }).catch(next);
});

//PUT update for edit user field in react app
router.put('/users/:id/edit', expressJoi(Validator.EditUser), function(req,res,next) {
  User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      User.findOne({_id: req.params.id}).then(function (user) {
        res.json({ success: true })
      });
  }).catch(next);
});

//PUT update specific for reset_password field in react app
router.put('/users/:id/reset_password', expressJoi(Validator.ResetPassword), function(req,res,next) {
    var pass = bcrypt.hashSync(req.body.password, 10);
    var userss = User.findOne({_id: req.params.id});
    userss.then(function (user) {
      expressJoi(Validator.ResetPassword);
      if (bcrypt.compareSync(req.body.old_password, user.password)){
        User.findOneAndUpdate({_id: req.params.id},{$set: {password: pass}}).then(function(){
            User.findOne({_id: req.params.id}).then(function (user) {
              res.json({ success: true })
            });
        }).catch(next);
      } else {
        res.status(404).json ({ success: false })
    }
  });
});

//DELETE delete a user from the database
router.delete('/users/:id', expressJoi(Validator.GetUser), function(req,res,next) {
  User.findByIdAndRemove({_id: req.params.id}).then(function(err, user){
      res.json({ success: true });
  }).catch(next);
});


module.exports = router;
