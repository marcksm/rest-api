const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
const Validator = require('../validation/user')
var jwt = require('jsonwebtoken');


//GET list of users from the database
router.get('/token', function(req,res,next) {
    res.send({token: jwt.sign({email: 'this.email'}, process.env.TOKEN)})
});

//GET list of users from the database
router.get('/', function(req,res,next) {
    res.send('Hello')
});


module.exports = router;
