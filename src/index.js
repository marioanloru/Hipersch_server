require('rootpath')();
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api', require('./api/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 9000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
/*let express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

//  For parsing application/json
app.use(bodyParser.json());

//  For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.listen(9000, () => {
  console.log('App listening at 9000');
});

app.get('/', (req, res) => {
  res.status(200).json('Hello, world!');
});
app.post('/login', (req, res) => {
  console.log('BODY:: ', req);
  console.log('PARAMS:', req.params);
  const { username, password } = req.body;

  if (username === 'Admin' && password === '1234') {
    res.status(401).json({
      error: 'usuario o password incorrecto'
    });
  } else {
    const tokenData = {
      username
    };
    const token = jwt.sign(tokenData, 'H4Mp%y-$.-B0Gg4r%tT');
    console.log('Token generado: ', token);
    res.status(200).json(token);
  }

});*/