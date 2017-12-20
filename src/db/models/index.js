const Sequelize = require('sequelize');
const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(module.filename);
const DB_CONFIG = require('../../../config');
var db = {};

const sequelize = new Sequelize(DB_CONFIG.DB_NAME, DB_CONFIG.DB_USER, DB_CONFIG.DB_PASSWORD, {
    host: DB_CONFIG.DB_SERVER,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

const Employee = sequelize.import(__dirname + '/employee.js');
const Job = sequelize.import(__dirname + '/job.js');
const User = sequelize.import(__dirname + '/user.js');
const Company = sequelize.import(__dirname + '/company.js');
const Department = sequelize.import(__dirname + '/department.js');
const AdminLevel = sequelize.import(__dirname + '/admin_level.js');

sequelize.authenticate().then( () => console.log('Connected to Database TimeTracker')).catch(err => console.log(err));

db = {
    sequelize,
    Sequelize,
    Employee,
    Job,
    User,
    Company,
    Department,
    AdminLevel
}

module.exports = db;