const express = require('express');

// Set Up express app
const app = express();

// Listen for request

app.listen(process.env.port || 4000, function() {
  console.log("Listening...");
});
