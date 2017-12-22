const request = require('supertest');
const app = require('../index')
const basicAuth = require('../middleware/auth')
const dummy = require('./testsData');
const User = require('../models/user')



describe('Test protected routes without API HTTP authentication', () => {
    it('Route GET (/).It should response the GET method 200 success', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    it('Route GET (/api/users/). It should response the GET method with ERROR 401 (No authorized)', (done) => {
      request(app).get('/api/users')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
    it('Route GET (/api/). It should response the GET method with ERROR 401 (No authorized)', (done) => {
      request(app).get('/api')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
    it('Route POST (/api/users/).It should response the PUT method with ERROR 401 (No authorized) ', (done) => {
      request(app).post('/api/users')
      .send(dummy.user2.signup)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
    it('Route PUT (/api/users/any_id/edit). It should response the PUT method with ERROR 401 (No authorized) ', (done) => {
      request(app).put('/api/users/any/edit')
      .send(dummy.user1.edit_email)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
    it('Route DELETE (/api/users/any_id). It should response the DELETE method with ERROR 401 (No authorized) ', (done) => {
      request(app).delete('/api/users/any/edit')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
});


describe('Test CRUD sequence in request in api/users/(dummy1 id), with API authentication', () => {
  it('(Create Joana) It should response the POST method with 200 success ', (done) => {
    request(app).post('/api/users')
    .set('Authorization', basicAuth.hashAuthhttp())
    .send(dummy.user2.signup)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('(Create John) Attempt to create an user with EMAIL already registered. POST method with 400 ERROR ', (done) => {
    request(app).post('/api/users')
    .set('Authorization', basicAuth.hashAuthhttp())
    .send(dummy.user1.signup_wrong_email)
    .then((response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it('(Create John) Attempt to create an user with PHONE already registered. POST method with 400 ERROR ', (done) => {
    request(app).post('/api/users')
    .set('Authorization', basicAuth.hashAuthhttp())
    .send(dummy.user1.signup_wrong_phone)
    .then((response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it('(Create John) Success in create user. POST method with 200 success ', (done) => {
    request(app).post('/api/users')
    .set('Authorization', basicAuth.hashAuthhttp())
    .send(dummy.user1.signup)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('(Login John) Attempt to login user with wrong password. It should response the POST method with 400 ERROR ', (done) => {
    request(app).post('/api/authenticate')
    .set('Authorization', basicAuth.hashAuthhttp())
    .send(dummy.user1.login_wrong)
    .then((response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

    it('(Login John) Success to login user. It should response the POST method with 200 success ', (done) => {
      request(app).post('/api/authenticate')
      .set('Authorization', basicAuth.hashAuthhttp())
      .send(dummy.user1.login)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

  it('(Edit email John) Attempt to edit EMAIL, already is registered. It should response the PUT method with 400 ERROR', (done) => {
      User.findOne({email: dummy.user1.signup.email}, function (err, user) {
        var id = user._id
        request(app).put('/api/users/'+id+'/edit')
        .set('Authorization', basicAuth.hashAuthhttp())
        .send(dummy.user1.edit_email_wrong)
        .then((response) => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
  });

  it('(Edit email John) Success edit email. It should response the PUT method with 200 success', (done) => {
      User.findOne({email: dummy.user1.signup.email}, function (err, user) {
        var id = user._id
        request(app).put('/api/users/'+id+'/edit')
        .set('Authorization', basicAuth.hashAuthhttp())
        .send(dummy.user1.edit_email)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
  });
  it('(Edit phone John) Attempt to edit PHONE, already is registered. It should response the PUT method with 400 ERROR', (done) => {
      User.findOne({email: dummy.user1.edit_email.email}, function (err, user) {
        var id = user._id
        request(app).put('/api/users/'+id+'/edit')
        .set('Authorization', basicAuth.hashAuthhttp())
        .send(dummy.user1.edit_phone_wrong)
        .then((response) => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
  });

  it('(Edit phone John) Success edit PHONE. It should response the PUT method with 200 success', (done) => {
      User.findOne({email: dummy.user1.edit_email.email}, function (err, user) {
        var id = user._id
        request(app).put('/api/users/'+id+'/edit')
        .set('Authorization', basicAuth.hashAuthhttp())
        .send(dummy.user1.edit_phone)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
  });

  it('(Edit back John) Success edit PHONE and EMAIL back. It should response the PUT method with 200 success', (done) => {
      User.findOne({email: dummy.user1.edit_email.email}, function (err, user) {
        var id = user._id
        request(app).put('/api/users/'+id+'/edit')
        .set('Authorization', basicAuth.hashAuthhttp())
        .send(dummy.user1.edit_back)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
  });


  it('(Reset pass John) Success reset password. It should response the PUT method with 200 success', (done) => {
      User.findOne({email: dummy.user1.signup.email}, function (err, user) {
        var id = user._id
        request(app).put('/api/users/'+id+'/reset_password')
        .set('Authorization', basicAuth.hashAuthhttp())
        .send(dummy.user1.reset_pass_ok)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
  });

  it('(Delte John) Delete user. It should response the DELETE method with 200 success', (done) => {
      User.findOne({email: dummy.user1.signup.email}, function (err, user) {
        var id = user._id
        request(app).delete('/api/users/'+id)
        .set('Authorization', basicAuth.hashAuthhttp())
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
  });
  it('(Delte Joane) Delete user. It should response the DELETE method with 200 success', (done) => {
      User.findOne({email: dummy.user2.signup.email}, function (err, user) {
        var id = user._id
        request(app).delete('/api/users/'+id)
        .set('Authorization', basicAuth.hashAuthhttp())
        .then((response) => {

            expect(response.statusCode).toBe(200);
            done();
        });
    });
  });

});
