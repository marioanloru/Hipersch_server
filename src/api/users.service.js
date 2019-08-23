const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const runningTestModel = require('./models/runningTest');
const cyclingTestModel = require('./models/cyclingTest');
const swimmingTestModel = require('./models/swimmingTest');

const runningUtils = require('../api/utils/runningUtils');
const swimmingUtils = require('../api/utils/swimmingUtils');
const cyclingUtils = require('../api/utils/cyclingUtils');

const bcrypt = require('bcryptjs');

function validateFields(email, password, lastName, firstName, gender, bodyWeight, height, swimmingCategory) {
  let validation = true;
  const swimmingCategories = [
    'afld',  //  Adult Female Long Distance
    'afs',    //  Adult Female Sprinter
    'amld',   //  Adult Male Long Distance
    'ams',    //  Adult Male Sprinter
    'jfld',   //  Junior Female Long Distance
    'jfs',    //  Junior Female Sprinter
    'jmld',   //  Junior Male Long Distance
    'jms',    //  Junior Male Sprinter
    'if',   //  Infantile Female
    'im',    // Infantile Male
    'bf',     //  Beginner Female
    'bm'     //  Beginner Male
  ]

  //  TODO: validate all fields
  if (swimmingCategories.indexOf(swimmingCategory) === -1) validation = false;
  return validation; 
}
module.exports = {
  authenticate(req, res) {
    const { email, password, athlete } = req.body;
    userModel
      .findOne({ email })
      .exec((err, user) => {
        if (err) {
          res.status(500).json(err);
        } else {
          if (user && bcrypt.compareSync(password, user.password)) {
            //  trainer login
            if (user.role === 'trainer' && athlete) {
              userModel
              .findOne({ email: athlete })
              .exec((err, athlete) => {
                if (err) {
                  res.status(400).json({ message: 'Could not retrieve athlete information' });
                } else {
                  const token = jwt.sign({ email: user.email, gender: athlete.gender, role: user.role, userId: athlete.id, bodyWeight: athlete.bodyWeight, height: athlete.height, swimmingCategory: athlete.swimmingCategory}, process.env.SECRET);
                  res.status(200).json({ token });
                }
              });
            } else {
              //common login
              const token = jwt.sign({ email: user.email, gender: user.gender, role: user.role, userId: user.id, bodyWeight: user.bodyWeight, height: user.height, swimmingCategory: user.swimmingCategory}, process.env.SECRET);
              res.status(200).json({ token });

            }
          } else {
            res.status(401).json({ message: 'Login credentials incorrect' });
          }
        }
      });
    },
  create(req, res) {
    const { email, password, lastName, firstName, gender, bodyWeight, height, swimmingCategory } = req.body;
    const role = req.body.role || 'athlete'; // Default role value
    userModel
      .findOne({ email })
      .exec((err, user) => {
        //  Usuario ya existe
        if (user) {
          res.status(200).json({ message: 'User already created' });
        } else {
          if ((role === 'admin') && (req.user.role !== 'admin')) {
            res.status(401).json('You do not have permissions for this action. This action will be reported');
          } else {
            if (role === 'athlete' || role === 'trainer') {
              if (validateFields(email, password, lastName, firstName, gender, bodyWeight, height, swimmingCategory)) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                const user = new userModel({ email, password: hashedPassword, lastName, firstName, bodyWeight, height, gender, role: 'athlete'});
                  user
                  .save((err, result) => {
                      if (err) { 
                        console.log(err);
                        res.status(400).json({ message: 'User could not be created' });
                      } else {
                        res.status(200).json({ message: 'User created' });
                      }
                  });
              } else res.status(400).json({ message: 'User could not be created' });
            } else {
              res.status(401).json({ message: 'User role invalid' });
            }
          }
        }
      });
  },
  delete(req, res) {
    const { email } = req.body;
    if (req.user.role === 'admin') {
      userModel
        .deleteOne({ email })
        .exec((err, result) => {
          if (err) { 
            console.log('Could not delete user: ', err);
            res.status(400).json({ message: 'Could not delete user' });
          } else {
            res.status(200).json({ message: 'User deleted' });
          }
        });
    } else {
      res.status(401).json({ message: 'You do not have permissions for this action. This action will be reported'});
    }
  },
  getUserData(req, res) {
    const { height, bodyWeight } = req.user;
    const heightMeter = height / 100;
    let bmi = bodyWeight / (heightMeter*heightMeter);
    console.log(req.user);
    bmi = Math.round(bmi * 10) / 10;
    console.elog
    res.status(200).json({ height, bodyWeight, bmi });
  },
  updateUserData(req, res) {
    const { height, bodyWeight } = req.body;

    userModel
      .updateOne({ email: req.user.email }, { $set: { height, bodyWeight }}, { omitUndefined: true })
      .exec((err, result) => {
        if (err) {
          res.status(400).json({ message: 'User data could not be modified'});
        } else {
          res.status(200).json({ message: 'User data modified. Please, login in again with new token data'});
        }
      });
  },
  getAthletes(req, res) {
    if (req.user.role === 'trainer') {
      userModel
        .find({ role: 'athlete'})
        .exec((err, result) => {
          if (err) {
            console.log(err);
            res.status(400).json({ message: 'Something went wrong'});
          } else {
            let emails = [];
            for (let i = 0; i < result.length; i += 1) {
              emails.push(result[i].email);
            }
            res.status(200).json({ emails });
          }
        });
    } else res.status(401).json({ message: 'This token has no permission for this action. This will be reported.'})
  },
  getProgress(req, res) {
    console.log('En get progress!!!');
    this.getProgressTests((err, data) => {
      console.log('Lo que se ha recuperado de getProgressTests!!', data);

      const keys = Object.keys(data);

      console.log('Las keys que se tienen:: ', keys);
      const result = {

      };
      let trainingZone;
      for (let i = 0; i < keys.length; i += 1) {
        if (!(keys[i] in result)) {
          result[keys[i]] = {};
        }

        switch (keys[i]) {
          case 'running':
            trainingZone = runningUtils.calculateTrainingZone(data[keys[i]].speed);
            result[keys[i]].value = data[keys[i]].speed;
            result[keys[i]].trainingZone = trainingZone;
            break;
          case 'swimming':
            trainingZone = swimmingUtils.calculateTrainingZone(data[keys[i]].timeTwoHundred, data[keys[i]].timeFourHundred);
            result[keys[i]].valueTwoHundred = timeTwoHundred;
            result[keys[i]].valueFourHundred =  timeFourHundred;
            result[keys[i]].trainingZoneTwoHundred = trainingZoneTwoHundred;
            result[keys[i]].trainingZoneFourHundred = trainingZoneFourHundred;
            break;
          case 'cycling':
            trainingZone = cyclingUtils.calculateTrainingZone(data[keys[i]].peakPower);
            result[keys[i]].value = data[keys[i]].p20min;
            result[keys[i]].trainingZone = trainingZone;
            break;
          default:
            break;
        }
      }

      res.status(200).json({ data: result });
    });
  },
  getProgressTests(callback) {
    const result = {};

    runningTestModel
      .find({ athlete: userId })
      .sort({ date: -1 })
      .limit(3)
      .exec((err, runningData) => {
        if (err) {
          callback(err);
        } else {
          result.running = runningData;
          swimmingTestModel
            .find({ athlete: userId })
            .sort({ date: -1 })
            .limit(3)
            .exec((err, swimmingData) => {
              if (err) {
                callback(err);
              } else {
                result.swimming = swimmingData;
                cyclingTestModel
                  .find({ athlete: userId, type: 'p6sec' })
                  .sort({ date: -1 })
                  .limit(3)
                  .exec((err, cyclingData) => {
                    if (err) {
                      callback(err);
                    } else {
                      result.cycling = cyclingData;
                      cyclingTestModel
                        .find({ athlete: userId, type: 'p1min' })
                        .sort({ date: -1 })
                        .limit(3)
                        .exec((err, cyclingDataOne) => {
                          if (err) {
                            callback(err);
                          } else {
                            result.cyclingOne = cyclingDataOne;
                            cyclingTestModel
                              .find({ athlete: userId, type: 'p6min' })
                              .sort({ date: -1 })
                              .limit(3)
                              .exec((err, cyclingDataSix) => {
                                if (err) {
                                  callback(err);
                                } else {
                                  result.cyclingSix = cyclingDataSix;
                                  cyclingTestModel
                                    .find({ athlete: userId, type: 'p20sec' })
                                    .sort({ date: -1 })
                                    .limit(3)
                                    .exec((err, cyclingDataTwenty) => {
                                      if (err) {
                                        callback(err);
                                      } else {
                                        result.cyclingTwenty = cyclingDataTwenty;
                                        callback(null, result)
                                      }
                                    });
                                }
                              });
                          }
                        });
                    }
                  });
              }
            });

        }
      });
  }
};

