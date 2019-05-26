const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');

module.exports = {
  authenticate(req, res) {
    const { email, password } = req.body;
    userModel
      .findOne({ email })
      .exec((err, user) => {
        if (err) {
          res.status(500).json(err);
        } else {
          if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ email: user.email, gender: user.gender, role: user.role, userId: user.id, bodyWeight: user.bodyWeight, height: user.height }, process.env.SECRET);
            res.status(200).json({ token });
          } else {
            res.status(400).json({ message: 'Login credentials incorrect' });
          }
        }
      });
    },
  create(req, res) {
    const { email, password, lastName, firstName, gender, bodyWeight, height} = req.body;
    const role = req.body.role || 'athlete'; // Default role value
    userModel
      .findOne({ email })
      .exec((err, user) => {
        //  Usuario ya existe
        if (user) {
          res.status(200).json({ message: 'User already created' });
        } else {
          if ((role === 'admin') && (req.user.role !== 'admin')) {
            res.status(400).json('You do not have permissions for this action. This action will be reported');
          } else {
            if (role === 'athlete' || role === 'trainer') {
              const hashedPassword = bcrypt.hashSync(password, 10);
              const user = new userModel({ email, password: hashedPassword, lastName, firstName, bodyWeight, height, gender, role});
                user
                .save((err, result) => {
                    if (err) { 
                      console.log(err);
                      res.status(400).json({ message: 'User could not be created' });
                    } else {
                      res.status(200).json({ message: 'User created' });
                    }
                });
            } else {
              res.status(200).json({ message: 'User role invalid' });
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
      res.status(400).json('You do not have permissions for this action. This action will be reported');
    }
  }
};

