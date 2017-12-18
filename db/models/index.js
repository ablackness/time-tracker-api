const Sequelize = require('sequelize');
const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(module.filename);
var db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

const Employee = sequelize.import(__dirname + '/employee.js');

sequelize.authenticate().then( () => console.log('Connected to Database TimeTracker')).catch(err => console.log(err));

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Employee = Employee;

module.exports = db;