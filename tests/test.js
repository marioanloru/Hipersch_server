require('dotenv').config();
process.env.SECRET = 'test1ngS44icret';
/*process.env.MONGODB_URI=
process.env.MONGODB_TEST_URI=
process.env.MONGODB_PORT=
process.env.MONGODB_DB=*/
const memoryServer = require('mongodb-memory-server');
const mongoose = require('mongoose');
const assert = require('assert');
const supertest = require('supertest');
//const app = require('../src/index');
const uuidv4 = require('uuid4');

const userService = require('../src/api/users.service');
const mathUtils = require('../src/api/utils/mathUtils');
const runningUtils = require('../src/api/utils/runningUtils');
const bcrypt = require('bcryptjs');

const UserModel = require('../src/api/models/user');
const RunningTestModel = require('../src/api/models/runningTest');
const app = require('../src/index');
//  const userService = require('../src/api/users.service');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
let mongoServer;
const opts = {};

before(done => {
  mongoServer = new memoryServer.MongoMemoryServer();

  mongoServer
    .getConnectionString()
    .then(mongoUri => {
      return mongoose.connect(mongoUri, opts, err => {
        if (err) done(err);
      });
    })
    .then(() => {
      done();
    });
});

after(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

//  Tests unitarios
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

//  Tests de integración
before(done => {
  mongoose.connection.collections.users.drop(() => {
    const hashedPassword = bcrypt.hashSync('password', 10);
    const user = new UserModel({ 
      email: 'testemail@hotmail.com',
      password: hashedPassword,
      lastName: 'lastname',
      firstName: 'firstname',
      bodyWeight: 72,
      height: 170,
      gender: 'male',
      role: 'athlete',
      swimmingCategory: 'afld'
    });
    user.save((err, newUser) => {
      const runningTest = new RunningTestModel({
        athlete: newUser._id,
        distance: 1800,
        speed: 5,
        MAVvVo2max: 7.33,
        vo2max: 7.33,
        vat: 7.33,
        testId: uuidv4()
      });
  
      const runningTest2 = new RunningTestModel({
        athlete: newUser._id,
        distance: 200,
        speed: 5,
        MAVvVo2max: 6.33,
        vo2max: 8.33,
        vat: 7.33,
        testId: uuidv4()
      });

      runningTest.save((testError, newTest) => {
        runningTest2.save((testError2, newTest2) => {
          done();
        })
      });
    });
  });
});

describe('REST API tests', () => {
  let token = '';
  it('User authentication', (done) => {
    const context = {
      email: 'testemail@hotmail.com',
      password: 'password'
    };
    supertest(app)
      .post('/api/user/login')
      .send(context)
      .expect('Content-type', /json/)
      .expect(200)
      .then(response => {
        token = response.body.token;
        done();
      });
  });

  it('User register', (done) => {
    const context = {
      email: 'testregister@hotmail.com',
      password: 'password',
      lastName: "test", 
      firstName: "test",
      gender: "male",
      bodyWeight: "72",
      height: "170",
      swimmingCategory: "junior male sprinter",
      role: "athlete"
    };
    supertest(app)
      .post('/api/user/register')
      .send(context)
      .expect('Content-type', /json/)
      .expect(200)
      .then(response => {
        done();
      });
  });


  it('Get user data', (done) => {
    supertest(app)
      .get('/api/user/data')
      .expect('Content-type', /json/)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(response => {
        assert.equal(response.body.height, "170");
        assert.equal(response.body.bodyWeight, "72");
        done();
      });
  });

  it('Update user data', () => {
    let context = {
      height: "160",
      bodyWeight: "65"      
    };
    supertest(app)
      .post('/api/user/data')
      .expect('Content-type', /json/)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(response => {
        assert.equal(response.body.message, "User data modified. Please, login in again with new token data");
      });
  });

  /*describe('Running tests', () => {
    console.log("running tests!!");
  
    it('Check get user tests', (done) => {
      console.log('El token que se envia -----------> ', token);
      supertest(app)
        .get('/api/running/test')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-type', /json/)
        .expect(200)
        .then(response => {
          console.log('Respuesta ----> ', response);
          assert.equal(response[0], runningTest);
          assert.equal(response[1], runningTest2);
          done();
        });
    });
    it('Check get training zone ', (done) => {
      console.log('El token que se envia -----------> ', token);
      supertest(app)
        .get('/api/running/trainingZone')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-type', /json/)
        .expect(200)
        .then(response => {
          console.log('Respuesta ----> ', response);
          //assert.equal(response[0], runningTest);
          done();
        });
    });
  });*/
});




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