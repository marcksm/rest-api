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

faker.locale = "pt_BR"
mongoose.Promise = global.Promise;

var db = mongoose.connect(process.env.MONGODB_PATH_ONLINE,{ useMongoClient: true }, function() {
  if ((parseInt(process.argv[2]) > 0 && process.argv[3] == 'r') || !(!!process.argv[2])){
    console.log('You can check avaiable commands running: node populate.js h')
    console.log('Reseting db')
    console.log('Mongodb collection dropped (reset)');
    mongoose.connection.db.dropDatabase(function (){ pop()});
  }
  else if (process.argv[2] == 'r' || parseInt(process.argv[2]) == 0) {
      console.log('Mongodb collection dropped (reset)');
      mongoose.connection.db.dropDatabase(function (){finishConnection()});
  }
  else if ((parseInt(process.argv[2]) && !(!!process.argv[3]))) {
    pop();
  }
  else if (process.argv[2] == 'h') {
    str = 'Avaliable populate commands:\n' +
     '\'node populate.js <X>    -- to include X new entries in db \'\n' +
     '\'node populate.js <X> r  -- to reset and populate with X new entries in db \'\n' +
     '\'node populate.js r      -- to reset db\''
      console.log(str);
      finishConnection();
  }
  else {
    str = 'Wrong arguments, please run\n' +
     '\'node populate.js <X>    -- to include X new entries in db \'\n' +
     '\'node populate.js <X> r  -- to reset and populate with X new entries in db \'\n' +
     '\'node populate.js r      -- to reset db\''
    console.log(str);
    finishConnection();
  }
});


function pop () {
  console.log('Populating...')
  async.whilst(function () { return successEntries < total;},
      function (next) {
        User.create(sample())
        .then(res => { successEntries++; next();})
        .catch(err => {next();} )
      },
  function (after) {
    finishConnection()
  });
}

function finishConnection() {
  mongoose.connection.close(function () {
       console.log('Mongodb connection disconnected');
       console.log('Exiting script');
     });
}

function sample () {
  return {
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    personal_phone: faker.phone.phoneNumberFormat(),
    password: bcrypt.hashSync('111111', 10)
  }
};
