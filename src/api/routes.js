const express = require('express');
const userService = require('./users.service');
const runningUtils = require('./utils/runningUtils');
const cyclingUtils = require('./utils/cyclingUtils');
const swimmingUtils = require('./utils/swimmingUtils');
const router = express.Router();


router
  .get('/status', (req, res) => {
    console.log(req.user);
    res.status(200).json({ message: 'Everything up and working'});
  });

  
router
  .get('/running/testByDate/:inicio/:fin', runningUtils.getUserTestsByDate);

router
  .get('/running/test/:limit/:offset', runningUtils.getUserTests);

router
  .get('/user/data', userService.getUserData);

router
  .get('/user/athletes', userService.getAthletes);

router
  .post('/user/data', userService.updateUserData);

router
  .post('/user/login', userService.authenticate);

router
  .get('/user/progress', userService.getProgress);

router
  .post('/user/register', userService.create);

router
  .post('/user/delete', userService.delete);

router
  .get('/running/trainingZone', runningUtils.getTrainingZone);

router
  .post('/running/test', runningUtils.insertTestSixMinutes);

router
  .delete('/running/test/:testId', runningUtils.deleteTest);

router
  .get('/cycling/test/:limit/:offset', cyclingUtils.getUserTests);

router
  .get('/cycling/test/sixsec', cyclingUtils.getUserTestsSixSec);

router
  .get('/cycling/test/onemin', cyclingUtils.getUserTestsOneMin);

router
  .get('/cycling/test/sixmin', cyclingUtils.getUserTestsSixMin);

router
  .get('/cycling/test/twentymin', cyclingUtils.getUserTestsTwentyMin);

router
  .post('/cycling/test/sixsec', cyclingUtils.insertTestSixSec);

router
  .post('/cycling/test/onemin', cyclingUtils.insertTestOneMin);

router
  .post('/cycling/test/sixmin', cyclingUtils.insertTestSixMin);

router
  .post('/cycling/test/twentymin', cyclingUtils.insertTestSixtyMin);

router
  .delete('/cycling/test/:testId', cyclingUtils.deleteTest);

router
  .get('/cycling/trainingZone', cyclingUtils.getTrainingZone);
router
  .get('/swimming/test/:limit/:offset', swimmingUtils.getUserTests);

router
  .post('/swimming/test', swimmingUtils.insertTest);

router
  .get('/swimming/trainingZone', swimmingUtils.getTrainingZone);


router
  .delete('/swimming/test/:testId', swimmingUtils.deleteTest);

module.exports = router;