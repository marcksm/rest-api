var auth = require('basic-auth');

function api(req, res, next) {
  var user = auth(req);

  if (user === undefined || user['name'] !== process.env.API_USER || user['pass'] !== process.env.API_PASS) {
   res.statusCode = 401;
   res.setHeader('WWW-Authenticate', 'Basic realm="example"');
   res.end('Unauthorized');
  }
  else {
   next();
  }
}

function hashAuthhttp() {
  var username = process.env.API_USER;
  var password = process.env.API_PASS;
  var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
  return auth;
}


module.exports.api = api;

module.exports.hashAuthhttp = hashAuthhttp;
