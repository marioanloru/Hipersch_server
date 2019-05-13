const assert = require('assert');
const request = require('request');

const mathUtils = require('../src/api/utils/mathUtils');
const runningUtils = require('../src/api/utils/runningUtils');
//  const app = require('../src/index');
//  const userService = require('../src/api/users.service');

describe('Math utils tests', () => {
  it('Check percentile rank', () => {
    let samples = [10.2, 11.7, 13.2, 14.6, 16, 17.5, 19, 20, 21.8, 22.2, 24];
    let value = 18.00;
    assert.equal(mathUtils.percentilRank(samples, value), 0.53);
  });

  it('Check linear interpolation', () => {
    assert.equal(mathUtils.linearInterpolation(17.5, 18, 19, 0, 100), 33.33);
  });
});
/*describe('Running tests', () => 
  it('Check running six minutes test', (done) => {
    //  Mock
    const reqMock = {
      body: {},
      cookies: {},
      query: {},
      params: {},
      user: {
        gender: 'female',
        userId: 'anuserid'
      }
    };
    const resMock = {
      clearCookie: spy(),
      cookie: spy(),
      download: spy(),
      end: spy(),
      format: spy(),
      json: spy(),
      jsonp: spy(),
      redirect: spy(),
      render: spy(),
      send: spy(),
      sendFile: spy(),
      sendStatus: spy(),
      set: spy(),
      type: spy()
    };
    const context = {
      distance: "1800"
    };
    runningUtils
      .insertTestSixMinutes(req, res)
      .then()
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
});*/

//  User api tests [TO DO]
/*describe('User tests', () => {
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
  /*it('Check user register', (done) => {
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
  it('Check user register', (done) => {
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
  });
});*/