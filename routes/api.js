const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

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
router.post('/users', function(req,res,next) {
  console.log(req.body)
  var pre = req.body
  pre.password = bcrypt.hashSync(req.body.password, 10);
  var user = new User(pre);
  user.save().then(function(user){
    res.send({user: user.tojson()});
  }).catch(next);
});

//GET a specific user in database
router.get('/users/:id', function(req,res,next) {
  User.findOne({_id: req.params.id}).then(function (user) {
    res.json({user: user.tojson()})
  }).catch(next);
});

//PUT update a user in the database
router.put('/users/:id', function(req,res,next) {

  if (req.body.password) {
    var pass = bcrypt.hashSync(req.body.password, 10);
    var userss = User.findOne({_id: req.params.id});
    userss.then(function (user){
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
  }
  else {
  User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      User.findOne({_id: req.params.id}).then(function (user) {
        res.json({ success: true })
      });
  }).catch(next);
 }
});

//DELETE delete a user from the database
router.delete('/users/:id', function(req,res,next) {
  User.findByIdAndRemove({_id: req.params.id}).then(function(err, user){
      res.send(user);
  }).catch(next);
});


module.exports = router;
