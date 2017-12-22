const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 Definition of user used in mongo db
 */
const UserSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email field is required'],
		lowercase: true,
		unique: true
	},
	first_name: {
		type: String,
		required: [true, 'First name field is required']
	},
	last_name: {
		type: String,
		required: [true, 'Last name field is required']
	},
	personal_phone: {
		type: String,
		required: [true, 'Personal phone field is required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password field is required']
	}
});

/**
Function that generate and return token based on user models email
 */
UserSchema.methods.generateToken = function generateToken() {
	return jwt.sign({
		 email: this.email
	 },
	process.env.TOKEN
	);
};

/**
 Function that receives a password
	and checks if password received is correct with bcrypt version in database, if so return true
	else false
 */
UserSchema.methods.isValidPassword = function isValidPassword(password) {
	if (bcrypt.compareSync(password, this.password)) {
		return true;
	}
	else {
		return false;
	}
};

/**
 Function that return a user model in JSON including token but not password
 */
UserSchema.methods.tojson = function tojson() {
	return {
		id: this._id,
		email: this.email,
		first_name: this.first_name,
		last_name: this.last_name,
		personal_phone: this.personal_phone,
		token: this.generateToken()
	};
};

/**
 Function that return a user model in JSON including password
 */
UserSchema.methods.tojsonPass = function tojson() {
	return {
		id: this._id,
		email: this.email,
		first_name: this.first_name,
		last_name: this.last_name,
		personal_phone: this.personal_phone,
		password: this.password
	};
};

/**
 User model
 */
const User = mongoose.model('user', UserSchema);


module.exports = User;
