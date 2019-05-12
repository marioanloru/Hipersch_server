const assert = require('assert');
const supertest = require('supertest');
const request = require('request');

const app = require('../src/index');
const userService = require('../src/api/users.service');

//  Library related tests
describe('User tests', () => {
  //  Get test admin token
  /*before((done) => {
    request('localhost:9000')
      .post('/api/user/login')
      .send({ username: 'admin', password: 'admin' })
      .end((err, res) => {
        adminToken = res.body.token;
        done(); 
      });
    });*/
  
  //  User creation
  it('Check user register', (done) => {
    const context = {
      "username": "mujer",
      "password": "finisterre",
      "firstName": "unamujer",
      "lastName": "muymujer",
      "gender": "female",
      "bodyWeight": "73",
      "height": "154",
      "role": "user"
    };
    supertest(app)
      .post('/api/user/register')
      .send(context)
      .expect('Content-type', /json/)
      .expect(200, {
        message: 'User created'
      }, done);
  });

  //  User already exists
  it('Check user already exists', (done) => {
    const context = {
      "username": "mujer",
      "password": "finisterre",
      "firstName": "unamujer",
      "lastName": "muymujer",
      "gender": "female",
      "bodyWeight": "52",
      "height": "163",
      "role": "user"
    };
    supertest(app)
      .post('/api/user/register')
      .send(context)
      .expect('Content-type', /json/)
      .expect(200, {
        message: 'User already created'
      }, done);
  });

  //  User admin creation error
  /*it('Check user register', (done) => {
    const context = {
      "username": "testAdmin",
      "password": "finisterre",
      "firstName": "unamujer",
      "lastName": "muymujer",
      "gender": "female",
      "bodyWeight": "73",
      "height": "154",
      "role": "admin"
    };
    supertest(app)
      .post('/api/user/register')
      .send(context)
      .expect('Content-type', /json/)
      .expect(200, {
        message: 'User created'
      }, done);
  });
  //  User delete
  it('Check user delete', (done) => {
    const context = {
      "username": "mujer"
    };
    supertest(app)
      .post('/api/user/delete')
      .set('Authorization', 'Bearer' + adminToken)
      .send(context)
      .expect('Content-type', /json/)
      .expect(200, {
        message: 'User deleted'
      }, done);
  });
  //  User delete failure on non existing user
  it('Check user failure on non existing user', (done) => {
    const context = {
      "username": "thisuserdoesnotexist"
    };
    supertest(app)
      .post('/api/user/delete')
      .set('Authorization', 'Bearer' + adminToken)
      .send(context)
      .expect('Content-type', /json/)
      .expect(400, {
        message: 'Could not delete user'
      }, done);
  });
  //  User delete failure beacuse of permission lack
  it('Check user failure beacuse of permission lack', (done) => {
    const context = {
      "username": "mujer"
    };
    supertest(app)
      .post('/api/user/delete')
      .send(context)
      .expect('Content-type', /json/)
      .expect(400, {
        message: 'You do not have permissions for this action. This action will be reported'
      }, done);
  });*/
});

describe('Running tests', () => {
  let token = '';
  before((done) => {
    const context = {
      "username": "test",
      "password": "test",
      "firstName": "unamujer",
      "lastName": "muymujer",
      "gender": "female",
      "bodyWeight": "52",
      "height": "163",
      "role": "user"
    };

    supertest(app)
      .post('/api/user/register')
      .send(context)
      .end((err, res) => {
        done();
      });
  });
  before((done) => {
    const context = {
      "username": "test",
      "password": "test",
    };
    supertest(app)
      .post('/api/user/login')
      .send(context)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  it('Check running six minutes test', (done) => {
    const context = {
      distance: "1800"
    };
    supertest(app)
      .post('/api/running/test')
      .set('Authorization', `Bearer ${token}`)
      .send(context)
      .expect('Content-type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.MAVvVo2max, 7.33);
        assert(response.body.vo2max, 7.33);
        assert(response.body.vat, 7.33);
        done();
      });
  })
});
