const mongoose = require('mongoose');
const User = require('./models/user')
const dotenv = require('dotenv');
const faker = require('faker');
const bcrypt = require('bcrypt');
var async = require('async');
var total = parseInt(process.argv[2]) || 50
var reset = false || !!process.argv[3]
var successEntries = 0;


dotenv.config();
var db = mongoose.connect(process.env.MONGODB_PATH_LOCAL,{ useMongoClient: true }, function() {
  if ((reset && process.argv[3] == 'r') || process.argv[2] == 'r' ){
    mongoose.connection.db.dropDatabase();
    console.log('Mongodb collection dropped (reset)');
  }
  console.log('Populating...');
  if (process.argv[2] == parseInt('0') || process.argv[2] == 'r' ) {
    console.log('KAI')
    total = -2
    successEntries= 50
  }
  async.whilst(function () { return successEntries < total;},
      function (next) {
        User.create(sample())
        .then(res => { successEntries++; next(); console.log(res)})
        .catch(err => {})
      },
  function (after) {
    mongoose.connection.close(function () {
         console.log('Done!')
         console.log('Mongodb connection disconnected');
         console.log('Exiting script');
       });
  });
});

faker.locale = "pt_BR"
mongoose.Promise = global.Promise;

function sample () {
  return {
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    personal_phone: faker.phone.phoneNumberFormat(),
    password: bcrypt.hashSync(faker.internet.password(), 10)
  }
};
