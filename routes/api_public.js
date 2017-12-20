const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const Validator = require('../validation/user')
var jwt = require('jsonwebtoken');


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
router.get('/token', function(req,res,next) {
    res.send({token: jwt.sign({email: 'this.email'}, process.env.TOKEN)})
});


module.exports = router;
