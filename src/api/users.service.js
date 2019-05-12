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
          if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ username: user.username, gender: user.gender, role: user.role, userId: user.id, bodyWeight: user.bodyWeight, height: user.height }, process.env.SECRET);
            res.status(200).json({ token });
          }
        }
      });
    },
  create(req, res) {
    const { username, password, lastName, firstName, gender, bodyWeight, height } = req.body;
    userModel
        .findOne({ username })
        .exec((err, user) => {
          //  Usuario ya existe
          if (user) {
            res.status(200).json({ message: 'El usuario ya existe' });
          } else {
              const hashedPassword = bcrypt.hashSync(password, 10);
              const user = new userModel({ username, password: hashedPassword, lastName, firstName, bodyWeight, height, gender, role: 'user'});
                user
                .save((err, result) => {
                    if (err) { 
                      res.status(400).json({ message: 'No se ha podido crear el Usuario' });
                    } else {
                      res.status(200).json({ message: 'Usuario creado correctamente' });
                    }
                });
          }
        });
    }
};

