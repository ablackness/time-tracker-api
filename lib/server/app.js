'use strict';

var express = require('express');
var morgan = require('morgan');
var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');
var bodyParser = require('body-parser');
var jwtAuthz = require('express-jwt-authz');
var cors = require('cors');

var app = express();

var db = require('../db/models');
db.sequelize.sync();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//add middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function (req, res) {
    res.status(200).send('HELLLO WORLD');
});

//set up routers
app.use('/api/employees', require('../db/routes/employees'));
app.use('/api/jobs', require('../db/routes/jobs'));
app.use('/api/users', require('../db/routes/users'));
app.use('/api/companies', require('../db/routes/companies'));
app.use('/api/departments', require('../db/routes/departments'));
app.use('/api/adminLevels', require('../db/routes/adminLevels'));
app.use('/api/employeeJobs', require('../db/routes/employeeJobs'));

module.exports = app;