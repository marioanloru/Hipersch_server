const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'Admin', password: '1234'}, { id: 2, username: 'User', password: '1234'}];

module.exports = {
  authenticate(req, res) {
    const { username, password } = req.body;
    console.log('LLEGA A FUNCION AUTHENTICATE!!');
    userModel
      .findOne({ username })
      .exec((err, user) => {
        if (err) {
            console.log('err')
        } else {
          console.log(`Buscando por username: ${username} y password ${password}: ` , user);
          if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ sub: user.id }, process.env.SECRET);
            res.status(200).json({ token });
          }
        }
      });
    },
  create(req, res) {
    console.log('HE ENTRADO EN CREATE');
    const { username, password, lastName, firstName, gender } = req.body;
    userModel
        .findOne({ username })
        .exec((err, user) => {
          console.log('RESPUESTA DE MONGOO');
          //  Usuario ya existe
          if (user) {
            res.status(200).json(user);
          } else {
              const hashedPassword = bcrypt.hashSync(password, 10);
              const user = new userModel({ username, password: hashedPassword, lastName, firstName, gender, role: 'user'});
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

