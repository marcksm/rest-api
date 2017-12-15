const express = require('express');
const routes = require('./routes/api');

// Set Up express app
const app = express();

// Initilize routes
app.use('/api',routes);

// Listen for request
app.listen(process.env.port || 4000, function() {
  console.log("Listening...");
});
