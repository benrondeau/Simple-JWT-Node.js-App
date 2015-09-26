//Dependencies
'use strict';

var express = require('express'); //middleware
var jwt = require('jsonwebtoken'); // all JWT functions
var morgan = require('morgan'); //log server functions to console
var bodyParser = require('body-parser'); //get values from HTTP requests

//App settings
var app = express();
app.use(morgan('dev')); // Log server operations to console. Has to be before routing functions....
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routing
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/authenticate', function (req, res) {

  if (req.body.username === 'user' && req.body.password === '12345') {

    // create a token
    var token = jwt.sign({ testing: true }, tokenSecret, {
      expiresInMinutes: 1440 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  } else {
    res.status(401).send('Wrong credentials!');
  }
});

//Server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

// Protected routes
var tokenSecret = 'apann49fn8apwounq9384fnpawiuefn';
var protectedRoutes = express.Router(); //middleware for protected routes - an instance of an express router inside of an express app.

protectedRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, tokenSecret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send('Access Denied. Invalid Credentials');
  }
});

// These routes are RELATIVE to /protected
protectedRoutes.get('/', function (req, res) {
  res.send('Welcome to the protected route! You have a valid JWT');
});

// apply the routes to our application with the prefix /api
app.use('/protected', protectedRoutes);
