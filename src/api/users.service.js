const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'Admin', password: '1234'}, { id: 2, username: 'User', password: '1234'}];

module.exports = {
  authenticate({ username, password }) {
    userModel
      .findOne({ username })
      .exec((err, user) => {
        if (err) {
            console.log('err')
        } else {
          console.log(user);
          if (user && bcrypt.compareSync(password, user.hash)) {
            const { hash, ...userWithoutHash } = user;
            const token = jwt.sign({ sub: user.id }, process.env.SECRET);
            return {
            ...userWithoutPassword,
            token
            };
          }
        }
      });
    },
  create(req, res) {
    const { username, password, lastName, firstName, gender } = req.body;
    userModel
        .findOne({ username })
        .exec((err, user) => {
        if (user) {
          res.status(200).json(user);
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = new userModel({ username, password: hashedPassword, lastName, firstName, gender });
            user
            .save((err, res) => {
                if (err) { 
                  res.status(400).json({ message: 'No se ha podido crear el Usuario' });
                } else {
                  return {res};
                }
            });
        }
        });
    }
};

