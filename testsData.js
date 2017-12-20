
const user1 = {
  signup_wrong_email: {
    email: 'joane@thevelops.com',
    first_name: 'John',
    last_name: 'Doe',
    personal_phone: '(11) 984219204',
    password: '111111',
    password_confirmation: '111111'
  },
  signup_wrong_phone: {
    email: 'john@thevelops.com',
    first_name: 'John',
    last_name: 'Doe',
    personal_phone: '(11) 384212204',
    password: '111111',
    password_confirmation: '111111'
  },
  signup: {
    email: 'john@thevelops.com',
    first_name: 'John',
    last_name: 'Doe',
    personal_phone: '(11) 984219204',
    password: '111111',
    password_confirmation: '111111'
  },
  login_wrong: {
    email: 'john@thevelops.com',
    password: '111211'
  },
  login: {
    email: 'john@thevelops.com',
    password: '111111'
  },
  edit_email_wrong: {
    email: 'joane@thevelops.com',
    first_name: 'John',
    last_name: 'Doe',
    personal_phone: '(11) 984219204'
  },
  edit_email: {
    email: 'john2@thevelops.com',
    first_name: 'John',
    last_name: 'Doe',
    personal_phone: '(11) 984219204'
  },
  edit_phone_wrong: {
    email: 'john2@thevelops.com',
    first_name: 'John',
    last_name: 'Doe',
    personal_phone: '(11) 384212204'
  },
  edit_phone: {
    email: 'john2@thevelops.com',
    first_name: 'John',
    last_name: 'Doe',
    personal_phone: '(11) 984219201'
  },
  edit_back: {
    email: 'john@thevelops.com',
    first_name: 'John',
    last_name: 'Doe',
    personal_phone: '(11) 984219204',
  },
  reset_pass_ok: {
    old_password: '111111',
    password: '2222222',
    password_confirmation: '222222'
  }
}

const user2 = {
  signup: {
    first_name: 'Joane',
    last_name: 'Doe',
    email: 'joane@thevelops.com',
    personal_phone: '(11) 384212204',
    password: '111111',
    password_confirmation: '111111'
  }
}

exports.user1 = user1;
exports.user2 = user2;
