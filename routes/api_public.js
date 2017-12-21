const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const Validator = require('../validation/user')
var jwt = require('jsonwebtoken');
const path = require('path');

//GET list of users from the database
router.get('/auth', function(req,res,next) {
    res.send({user: process.env.API_USER, pass: process.env.API_PASS})
});

router.get('/db_users', function(req,res,next) {
  User.count({}, function( err, count){
  res.send({users: count})
  });
});

//GET list of users from the database
router.get('/', function(req,res,next) {

  res.sendFile(path.join(__dirname+'/root.html'));

});


module.exports = router;
