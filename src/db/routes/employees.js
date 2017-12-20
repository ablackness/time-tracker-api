const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';
var employeeCache = {};
const cacheRefreshTime = 86400;

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    if (employeeCache && (Date.now() - employeeCache.updatedTime < cacheRefreshTime) ) {
        console.log('getting data from cache');
        handleResponse(employeeCache.employees, req, res);
    } else {
        console.log('hitting DB');
        db.Employee
        .findAll()
        .then(employees => {
            employeeCache.employees = employees;
            employeeCache.updatedTime = Date.now();
            handleResponse(employees, req, res);
        })
    }
    
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.Employee
    .findById(req.params.id)
    .then( employee => {
        handleResponse(employee, req, res);   
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var employee = req.body;
    db.Employee
    .create(employee)
    .then( employee => {
        console.log('ID:', employee.EmployeeID);
        handleResponse(employee.EmployeeID, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var employee = req.body;
    db.Employee
    .update(employee, {
        where: {id: req.params.id}
    })
    .then( employee => {
        handleResponse(employee, req, res); 
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.Employee
    .findById(req.params.id)
    .then( employee => {
        if (!employee) {
            res.status(404).send('No employee found.');
        } else {
            employee.destroy()
            res.status(200).json(employee);
        }  
    })
})

module.exports = router;