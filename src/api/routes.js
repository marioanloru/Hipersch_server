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
  .get('/running/test/:inicio/:fin', runningUtils.getUserTestsByDate);

router
  .get('/running/tests', runningUtils.getUserTests);

router
  .get('/user/data', userService.getUserData);

router
  .post('/user/login', userService.authenticate);

router
  .post('/user/register', userService.create);

router
  .post('/user/delete', userService.delete);

router
  .post('/running/test', runningUtils.insertTestSixMinutes);

router
  .get('/cycling/test', cyclingUtils.getUserTests);

router
  .post('/cycling/test', cyclingUtils.insertTest);

router
  .post('/cycling/test/sixsec', cyclingUtils.insertTestSixSec);

router
  .post('/cycling/test/onemin', cyclingUtils.insertTestOneMin);

router
  .post('/cycling/test/sixmin', cyclingUtils.insertTestSixMin);

router
  .post('/cycling/test/twentymin', cyclingUtils.insertTestSixtyMin);

router
  .get('/swimming/test', swimmingUtils.getUserTests);

router
  .post('/swimming/test', swimmingUtils.insertTest);

module.exports = router;