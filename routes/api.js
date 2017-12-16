const express = require('express');
const router = express.Router();
const User = require('../models/user')

//GET list of users from the database
router.get('/users', function(req,res,next) {
  User.find({}).then(function(users){
    res.send(users);
  }).catch(next);
});

//POST add a new user to database
router.post('/users', function(req,res,next) {
  var user = new User(req.body);
  user.save().then(function(user){
    res.send(user);
  }).catch(next);
});

//GET a specific user in database
router.get('/users/:id', function(req,res,next) {
  User.findOne({_id: req.params.id}).then(function (user) {
    res.send(user);
  }).catch(next);
});

//PUT update a user in the database
router.put('/users/:id', function(req,res,next) {
  User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      User.findOne({_id: req.params.id}).then(function (user) {
        res.send(user);
      });
  }).catch(next);
});

//DELETE delete a user from the database
router.delete('/users/:id', function(req,res,next) {
  User.findByIdAndRemove({_id: req.params.id}).then(function(err, user){
      res.send(user);
  }).catch(next);
});


module.exports = router;
