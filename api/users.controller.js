const express = require('express');
const router = express.Router();
const userService = require('./users.service');
console.log('USERS CONTROLLERS');
// routes
router
  .post('/login', login);

router
  .get('/', getAll);

module.exports = router;

function login(req, res, next) {
  console.log('IN USERS CONTROLLER:: ');
  console.log(req.body);
  console.log('PARAAAMS:: ', req.params);
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  console.log('GETALLLL:: ');
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}