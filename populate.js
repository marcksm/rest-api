const mongoose = require('mongoose');
const User = require('./models/user');
const dotenv = require('dotenv');
const faker = require('faker');
const bcrypt = require('bcrypt');
var async = require('async');
var total = parseInt(process.argv[2]) || 50;
var reset = false || !!process.argv[3];
var successEntries = 0;
var connection_type = process.env.MONGODB_PATH_ONLINE;
/**
 Initilize enviorments configuration
 */
dotenv.config();

/**
 Initilize faker configutions
 */
faker.locale = "pt_BR";
mongoose.Promise = global.Promise;

/**
 Connect to mongodb ONLINE BY DEFAULT check .env files
 */
function readArgs () {
	if ((process.argv[2]) == 'L' || (process.argv[3]) == 'L' || (process.argv[4]) == 'L'|| (process.argv[5]) == 'L') {
		connection_type = process.env.MONGODB_PATH_LOCAL;
	}
	else {
		connection_type = process.env.MONGODB_PATH_ONLINE;
	}
}

readArgs();
var db = mongoose.connect(connection_type,{ useMongoClient: true }, function() {
	str = 'You are connected to mongodb at:\n' + connection_type;
	console.log(str);
	if ((parseInt(process.argv[2]) > 0 && process.argv[3] == 'r') || !(!!process.argv[2]) || process.argv[2] == 'L'){
		console.log('You can check avaiable commands running: node populate.js h');
		console.log('Reseting db');
		console.log('Mongodb collection dropped (reset)');
		mongoose.connection.db.dropDatabase(function () {
			pop();
		});
	}
	else if (process.argv[2] == 'r' || parseInt(process.argv[2]) == 0) {
		console.log('You can check avaiable commands running: node populate.js h');
		console.log('Reseting db');
		console.log('Mongodb collection dropped (reset)');
		mongoose.connection.db.dropDatabase (function () {
			finishConnection();
		});
	}
	else if ((parseInt(process.argv[2]) && !(!!process.argv[3])) || parseInt(process.argv[2]) && process.argv[3] == 'L') {
		console.log('You can check avaiable commands running: node populate.js h');
		pop();
	}
	else if (process.argv[2] == 'h') {
		str = 'Avaliable populate commands:\n' +
		 '\'node populate.js <X>   -- to include X new entries in db \'\n' +
		 '\'node populate.js <X> r  -- to reset and populate with X new entries in db \'\n' +
		 '\'node populate.js r      -- to reset db\'\n' +
		 '\'TO RUN LOCALY: Put L argument after your arguments (requires mongo db set up and running localy) \'\n';
		console.log(str);
		finishConnection();
	}
	else {
		str = 'Wrong arguments, please run\n' +
		 '\'node populate.js <X>    -- to include X new entries in db \'\n' +
		 '\'node populate.js <X> r  -- to reset and populate with X new entries in db \'\n' +
		 '\'node populate.js r      -- to reset db\'\n' +
		 '\'TO RUN LOCALY: Put L argument after your arguments (requires mongo db set up and running localy) \'\n';
		console.log(str);
		finishConnection();
	}
});

/**
 Function to populate database
 */
function pop () {
	console.log('Populating...');
	async.whilst(function () { return successEntries < total;},
		function (next) {
			User.create(sample())
				.then(res => { successEntries++; next();})
				.catch(err => {next();});
		},
		function (after) {
			finishConnection();
		});
}

/**
 Function to end mongodb connection
 */
function finishConnection() {
	mongoose.connection.close(function () {
			 console.log('Mongodb connection disconnected');
			 console.log('Exiting script');
		 });
}

/**
 Function that returns a user sample with fake info
 */
function sample () {
	return {
		email: faker.internet.email(),
		first_name: faker.name.firstName(),
		last_name: faker.name.lastName(),
		personal_phone: faker.phone.phoneNumberFormat(),
		password: bcrypt.hashSync('111111', 10)
	};
};
