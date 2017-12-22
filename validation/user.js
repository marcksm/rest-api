const Joi = require('joi');
const expressJoi = require('express-joi-validator');

/**
	Valition fields for routes
*/
module.exports = {
	SignUp: {
		body: {
			email: Joi.string().email().required().label('User Email'),
			first_name: Joi.string().required().label('First name'),
			last_name: Joi.string().required().label('Last name'),
			personal_phone: Joi.string().required().label('Phone'),
			password: Joi.string().required().label('Password'),
			password_confirmation:Joi.string().required().label('Confirmation Password')
		}
	},
	Login: {
		body: {
			email: Joi.string().email().required().label('User Email'),
			password: Joi.string().required().label('Password')
		}
	},
	User: {
		params: {
		 id: Joi.string().required().label('id')
	 },
		body: {
			email: Joi.string().email().required().label('User Email'),
			first_name: Joi.string().required().label('First name'),
			last_name: Joi.string().required().label('Last name'),
			personal_phone: Joi.string().required().label('Phone'),
			password: Joi.string().required().label('Password')
		}
	},
	EditUser: {
		params: {
		 id: Joi.string().required().label('id')
	 },
		body: {
			email: Joi.string().email().required().label('User Email'),
			first_name: Joi.string().required().label('First name'),
			last_name: Joi.string().required().label('Last name'),
			personal_phone: Joi.string().required().label('Phone'),
		}
	},
	ResetPassword: {
		params: {
		 id: Joi.string().required().label('id')
	 },
		body: {
			password: Joi.string().required().label('Password'),
			password_confirmation:Joi.string().required().label('Confirmation Password'),
			old_password: Joi.string().required().label('Old Password')
		}
	},
	GetUser: {
		params: {
		 id: Joi.string().required().label('id')
		}
	}
};
