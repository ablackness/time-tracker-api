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


app.get('/api/employees', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    db.Employee
    .findAll()
        .then(employees => {
            res.status(200).json(employees);
        })
})

app.get('/api/employee/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.Employee
    .findById(req.params.id)
    .then( employee => {
        if(!employee) {
            res.status(404).send('No employee found');
        } else {
            res.status(200).json(employee);
        }
    })
})

app.post('/api/employee/add', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var employee = req.body;
    console.log(employee)
    db.Employee
    .create(employee)
    .then( employee => {
        console.log('ID:', employee.EmployeeID);
        res.status(201).json(employee.Employee);
    })
})


module.exports = app;