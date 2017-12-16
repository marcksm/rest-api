const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create users Schema and model
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email field is required'],
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

const User = mongoose.model('user', UserSchema);
module.exports = User;
