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
const async = require('async');
//const app = require('../src/index');
const uuidv4 = require('uuid4');

const userService = require('../src/api/users.service');
const mathUtils = require('../src/api/utils/mathUtils');
const runningUtils = require('../src/api/utils/runningUtils');
const bcrypt = require('bcryptjs');

const initializeUtils = require('../scripts/utils');
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

const runningTestId1 = uuidv4();
const runningTestId2 = uuidv4();

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
        testId: runningTestId1
      });
  
      const runningTest2 = new RunningTestModel({
        athlete: newUser._id,
        distance: 200,
        speed: 5,
        MAVvVo2max: 6.33,
        vo2max: 8.33,
        vat: 7.33,
        testId: runningTestId2
      });

      runningTest.save((testError, newTest) => {
        runningTest2.save((testError2, newTest2) => {
          async
            .parallel([
              (callback) => {
                initializeUtils.initializeRunningTable((err, res) => {
                  if (err) {
                    callback(err);
                  } else {
                    callback(null, res);
                  }
                });
              },
              (callback) => {
                initializeUtils.initializeCyclingTable((err, res) => {
                  if (err) {
                    callback(err);
                  } else {
                    callback(null, res);
                  }
                });
              },
              (callback) => {
                initializeUtils.initializeCyclingPeakTable((err, res) => {
                  if (err) {
                    callback(err);
                  } else {
                    callback(null, res);
                  }
                });
              },
              (callback) => {
                initializeUtils.initializeSwimmingTable((err, res) => {
                  if (err) {
                    callback(err);
                  } else {
                    callback(null, res);
                  }
                });
              }
            ], (err, res) => {
              done();
            });
        })
      });
    });
  });
});

describe('REST API tests', () => {
  let token = '';
  it('Check API status', () => {
    supertest(app)
      .get('/api/status')
      .expect(200)
      .then(response => {
        assert.equal(response.body.message, 'Everything up and working');
      });
  });

  it('User authentication', () => {
    const context = {
      email: 'testemail@hotmail.com',
      password: 'password'
    };
    supertest(app)
      .post('/api/user/login')
      .send(context)
      .expect(200)
      .then(response => {
        token = response.body.token;
      });
  });

  /*it('User authentication failure', () => {
    const context = {
      email: 'testemassssasdasdadsil@hotmail.com',
      password: 'password'
    };
    supertest(app)
      .post('/api/user/login')
      .expect(500)
      .then(response => {
        assert.equal(response.body.message, 'Login credentials incorrect');
      });
  });*/

  it('User register', () => {
    const context = {
      email: 'testregister@hotmail.com',
      password: 'password',
      lastName: "test", 
      firstName: "test",
      gender: "male",
      bodyWeight: "72",
      height: "170",
      swimmingCategory: "jms",
      role: "athlete"
    };
    supertest(app)
      .post('/api/user/register')
      .send(context)
      .expect(200)
      .then(response => {
      });
  });

  it('User register failure', () => {
    const context = {
      email: 'testregisttterrrr@hotmail.com',
      password: 'password',
      lastName: "test", 
      firstName: "test",
      gender: "male",
      bodyWeight: "72",
      height: "170",
      role: "athlete"
    };
    supertest(app)
      .post('/api/user/register')
      .send(context)
      .expect(400)
      .then(response => {
        assert.equal(response.body.message, 'Swiming category is needed');
      });
  });

  it('User register on existing user failure', () => {
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
      .expect(200)
      .then(response => {
        assert.equal(response.body.message, 'User already created');
      });
  });

  it('Get user data', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBob3RtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJyb2xlIjoiYXRobGV0ZSIsInVzZXJJZCI6IjVkNmQ2Mjc4ZDA3MTgwM2VjYjQ0NzQwOSIsImJvZHlXZWlnaHQiOjcyLCJoZWlnaHQiOjE3MCwic3dpbW1pbmdDYXRlZ29yeSI6ImFmbGQiLCJpYXQiOjE1Njc0NDk3MjB9.56-1ZDcZFw3RnrlM2K2dlYZQH_aw4cR1j8hEat8zbeI';
    supertest(app)
      .get('/api/user/data')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(response => {
        assert.equal(response.body.height, "170");
        assert.equal(response.body.bodyWeight, "72");
      });
  });

  it('Update user data', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBob3RtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJyb2xlIjoiYXRobGV0ZSIsInVzZXJJZCI6IjVkNmQ2Mjc4ZDA3MTgwM2VjYjQ0NzQwOSIsImJvZHlXZWlnaHQiOjcyLCJoZWlnaHQiOjE3MCwic3dpbW1pbmdDYXRlZ29yeSI6ImFmbGQiLCJpYXQiOjE1Njc0NDk3MjB9.56-1ZDcZFw3RnrlM2K2dlYZQH_aw4cR1j8hEat8zbeI';
    let context = {
      height: "160",
      bodyWeight: "65"      
    };
    supertest(app)
      .post('/api/user/data')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(response => {
        assert.equal(response.body.message, "User data modified. Please, login in again with new token data");
      });
  });

  //  User delete failure beacuse of permission lack
  it('Check user unauthorized failure', (done) => {
    const context = {
      "email": "unexistingemail@hotmail.com"
    };
    supertest(app)
      .post('/api/user/delete')
      .set('Authorization', `Bearer ${token}`)
      .send(context)
      .expect(401, {
        message: 'You do not have permissions for this action. This action will be reported'
      }, done);
  });

  it('Delete user test', () => {
    const context = {
      email: 'testemail@hotmail.com',
      password: 'password'
    };

    RunningTestModel
      .findOne({ testId: runningTestId1 })
      .exec((err, data) => {
        supertest(app)
          .post(`/api/running/test/${runningTestId1}`)
          .set('Authorization', `Bearer ${token}`)
          .send(context)
          .expect(200)
          .then(response => {
            assert.equal(response.body.message, 'Test deleted. ');
          });
      });
  });

  it('Delete running test failure', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBob3RtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJyb2xlIjoiYXRobGV0ZSIsInVzZXJJZCI6IjVkNmQ2Mjc4ZDA3MTgwM2VjYjQ0NzQwOSIsImJvZHlXZWlnaHQiOjcyLCJoZWlnaHQiOjE3MCwic3dpbW1pbmdDYXRlZ29yeSI6ImFmbGQiLCJpYXQiOjE1Njc0NDk3MjB9.56-1ZDcZFw3RnrlM2K2dlYZQH_aw4cR1j8hEat8zbeI';
    RunningTestModel
      .findOne({ testId: uuidv4() })
      .exec((err, data) => {
        supertest(app)
          .post(`/api/running/test/${uuidv4()}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404);
      });
  });
  
  it('Insert Swimming test', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBob3RtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJyb2xlIjoiYXRobGV0ZSIsInVzZXJJZCI6IjVkNmQ2Mjc4ZDA3MTgwM2VjYjQ0NzQwOSIsImJvZHlXZWlnaHQiOjcyLCJoZWlnaHQiOjE3MCwic3dpbW1pbmdDYXRlZ29yeSI6ImFmbGQiLCJpYXQiOjE1Njc0NDk3MjB9.56-1ZDcZFw3RnrlM2K2dlYZQH_aw4cR1j8hEat8zbeI';    
    const context = {
      "timeFourHundred": "755",
      "timeTwoHundred": "377"
    };
    supertest(app)
      .post('/api/swimming/test')
      .set('Authorization', `Bearer ${token}`)
      .send(context)
      .expect(200);
  });

  it('Insert Running test', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBob3RtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJyb2xlIjoiYXRobGV0ZSIsInVzZXJJZCI6IjVkNmQ2Mjc4ZDA3MTgwM2VjYjQ0NzQwOSIsImJvZHlXZWlnaHQiOjcyLCJoZWlnaHQiOjE3MCwic3dpbW1pbmdDYXRlZ29yeSI6ImFmbGQiLCJpYXQiOjE1Njc0NDk3MjB9.56-1ZDcZFw3RnrlM2K2dlYZQH_aw4cR1j8hEat8zbeI';    
    const context = {
      "distance": "1800"
    };
    supertest(app)
      .post('/api/running/test')
      .set('Authorization', `Bearer ${token}`)
      .send(context)
      .expect(200);
  });

  it('Insert Cycling test', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBob3RtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJyb2xlIjoiYXRobGV0ZSIsInVzZXJJZCI6IjVkNmQ2Mjc4ZDA3MTgwM2VjYjQ0NzQwOSIsImJvZHlXZWlnaHQiOjcyLCJoZWlnaHQiOjE3MCwic3dpbW1pbmdDYXRlZ29yeSI6ImFmbGQiLCJpYXQiOjE1Njc0NDk3MjB9.56-1ZDcZFw3RnrlM2K2dlYZQH_aw4cR1j8hEat8zbeI';    
    const context = {
      "peakPower": "1200"
    };
    supertest(app)
      .post('/api/cycling/test/sixsec')
      .set('Authorization', `Bearer ${token}`)
      .send(context)
      .expect(200);
  });

});
