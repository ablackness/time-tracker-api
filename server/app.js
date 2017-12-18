const express = require('express');
const morgan  = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser');
const jwtAuthz = require('express-jwt-authz');
const cors = require('cors');

const app = express();

const db = require('../db/models');
db.sequelize.sync();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//add middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://codeblack.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'http://localhost:8080',
    issuer: `https://codeblack.auth0.com/`,
    algorithms: ['RS256']
});

app.get('/', function(req, res) {
    res.status(200).send('HELLLO WORLD');
})

app.use('/api/employees', require('../db/routes/employees'));
app.use('/api/jobs', require('../db/routes/jobs'))

module.exports = app;