const express = require('express');

const router = express.Router();

//GET list of users from the database
router.get('/users', function(req,res) {
  res.send({type: 'GET'});
});

//POST add a new user to database
router.post('/users', function(req,res) {
  console.log(req.body);
  res.send({
    type: 'POST',
    email: req.body.email,
    first_name: req.body.first_name
  });
});

//GET a specific user in database
router.get('/users/:id', function(req,res) {
  res.send({type: 'GETID'});
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
