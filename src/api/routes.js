const express = require('express');
const userService = require('./users.service');
const runningUtils = require('./utils/runningUtils');
const cyclingUtils = require('./utils/cyclingUtils');
const router = express.Router();


router
  .post('/login', userService.authenticate);

router
  .post('/register', userService.create);


/*router
  .get('/', userService.getAll);*/
router
  .get('/', (req, res) => {
    console.log(req.user);
    res.status(200).json({data: 'Hello world'})
  });

router
  .post('/running/test', runningUtils.insertTestSixMinutes);

router
  .post('/cycling/test', cyclingUtils.insertTest);

router
  .post('/cycling/test/fivesec', cyclingUtils.insertTestFiveSec);

router
  .post('/cycling/test/onemin', cyclingUtils.insertTestOneMin);

router
  .post('/cycling/test/fivemin', cyclingUtils.insertTestFiveMin);

router
  .post('/cycling/test/sixtymin', cyclingUtils.insertTestSixtyMin);



router
  .get('/running/test/:inicio/:fin', runningUtils.getUserTestsByDate);

router
  .get('/running/tests', runningUtils.getUserTests);

/*router
  .post('/test/running', (req, res) => {res.status(200).send('Hello world')})

router
  .post('/test/swimming', (req, res) => {res.status(200).send('Hello world')})

router
  .post('/test/running', (req, res) => {res.status(200).send('Hello world')})*/

module.exports = router;