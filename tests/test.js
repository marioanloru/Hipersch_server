const assert = require('assert');
const supertest = require('supertest');

const app = require('../src/index');
const userService = require('../src/api/users.service');

//  Library related tests
describe('User tests', () => {
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
      .post('/api/register')
      .send(context)
      .expect('Content-type', /json/)
      .expect(200, {
        message: 'User created'
      }, done);
  });
});
