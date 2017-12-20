'use strict';

var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var DB_CONFIG = require('../../../config');
var db = {};

var sequelize = new Sequelize(DB_CONFIG.DB_NAME, DB_CONFIG.DB_USER, DB_CONFIG.DB_PASSWORD, {
    host: DB_CONFIG.DB_SERVER,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

var Employee = sequelize.import(__dirname + '/employee.js');
var Job = sequelize.import(__dirname + '/job.js');
var User = sequelize.import(__dirname + '/user.js');
var Company = sequelize.import(__dirname + '/company.js');
var Department = sequelize.import(__dirname + '/department.js');
var AdminLevel = sequelize.import(__dirname + '/admin_level.js');

sequelize.authenticate().then(function () {
    return console.log('Connected to Database TimeTracker');
}).catch(function (err) {
    return console.log(err);
});

db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    Employee: Employee,
    Job: Job,
    User: User,
    Company: Company,
    Department: Department,
    AdminLevel: AdminLevel
};

module.exports = db;