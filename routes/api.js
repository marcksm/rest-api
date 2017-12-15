const express = require('express');

const router = express.Router();

//GET list of users from the database
router.get('/users', function(req,res) {
  res.send({type: 'GET'});
});

//POST add a new user to database
router.post('/users', function(req,res) {
  res.send({type: 'POST'});
});

//PUT update a user in the database
router.put('/users/:id', function(req,res) {
  res.send({type: 'PUT'});
});

//DELETE delete a user from the database
router.delete('/users/:id', function(req,res) {
  res.send({type: 'DELETE'});
});


module.exports = router;
