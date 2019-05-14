const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');

module.exports = {
  authenticate(req, res) {
    const { username, password } = req.body;
    userModel
      .findOne({ username })
      .exec((err, user) => {
        if (err) {
          res.status(500).json(err);
        } else {
          console.log('Encontrado el usuario: ', username)
          if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ username: user.username, gender: user.gender, role: user.role, userId: user.id, bodyWeight: user.bodyWeight, height: user.height }, process.env.SECRET);
            res.status(200).json({ token });
          }
        }
      });
    },
  create(req, res) {
    console.log('DENTRO DE FUNCION CREATE');
    const { username, password, lastName, firstName, gender, bodyWeight, height, role} = req.body;
    userModel
      .findOne({ username })
      .exec((err, user) => {
        console.log('HE ENCONTRADO EL USUARIO', username);
        //  Usuario ya existe
        if (user) {
          res.status(200).json({ message: 'User already created' });
        } else {
          
          if ((role === 'admin') && (req.user.role !== 'admin')) {
            res.status(400).json('You do not have permissions for this action. This action will be reported');
          } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = new userModel({ username, password: hashedPassword, lastName, firstName, bodyWeight, height, gender, role: 'user'});
              user
              .save((err, result) => {
                  if (err) { 
                    console.log('Could not create user: ', err);
                    res.status(400).json({ message: 'User could not be created' });
                  } else {
                    res.status(200).json({ message: 'User created' });
                  }
              });
          }
        }
      });
  },
  delete(req, res) {
    const { username } = req.body;
    if (req.user.role === 'admin') {
      userModel
        .deleteOne(username)
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

