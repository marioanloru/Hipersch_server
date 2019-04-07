const express = require('express');
const userService = require('./users.service');
const testUtils = require('./utils/testUtils');
const runningUtils = require('./utils/runningUtils');
const router = express.Router();


router
  .post('/login', userService.authenticate);

/*router
  .get('/', userService.getAll);*/
router
  .get('/', (req, res) => {res.status(200).send('Hello world')});

/** BORRAR EN EL FUTURO, SOLO DEEB PODER EL ADMIN */
router
  .get('/test/initialize', runningUtils.initialize);

router
  .post('/test/running', (req, res) => {res.status(200).send('Hello world')})

router
  .post('/test/swimming', (req, res) => {res.status(200).send('Hello world')})

router
  .post('/test/running', (req, res) => {res.status(200).send('Hello world')})

module.exports = router;