const express = require('express');
const router = express.Router();
const userService = require('./users.service');

module.exports = {
  login(req, res, next) {
    userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
  },
  getAll(req, res, next) {
    userService.getAll()
      .then(users => res.json(users))
      .catch(err => next(err));
  }
};
