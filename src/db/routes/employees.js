const express = require('express');
const router = express.Router();
const jwtAuthz = require('express-jwt-authz');
const Seqeulize = require('sequelize');
import handleResponse from '../utils/handleResponse';
import checkJwt from '../utils/jwt';
import db from '../models/index';
var employeeCache = {};
employeeCache.needsToUpdate = true;
const cacheRefreshTime = 86400;

//route to get all employees from DB -  will use cache if it is available and not expired
router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    if (Date.now() - employeeCache.updatedTime > cacheRefreshTime) {
        employeeCache.needsToUpdate = true;
    }
    if (employeeCache && !employeeCache.needsToUpdate) {
        console.log('getting data from cache');
        handleResponse(employeeCache.employees, req, res);
    } else {
        console.log('hitting DB');
        db.Employee
        .findAll()
        .then(employees => {
            employeeCache.employees = employees;
            employeeCache.updatedTime = Date.now();
            employeeCache.needsToUpdate = false;
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
    var d = new Date();
    employee.created_date = d;
    employee.modified_date = d;
    db.Employee
    .create(employee)
    .then( employee => {
        employeeCache.needsToUpdate = true;
        handleResponse(employee.EmployeeID, req, res);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var employee = req.body;
    const d = new Date();
    employee.modified_date = d;
    db.Employee
    .update(employee, {
        where: {EmployeeID: req.params.id}
    })
    .then( result => {
        if(result[0] === 0) 
        {
            res.status(404).send('No employee found');
        } else {
            employeeCache.needsToUpdate = true;
            res.status(200).send('Employee ID ' + req.params.id + ' updated!');
        }
        // handleResponse(employee, req, res); 
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.Employee
    .findById(req.params.id)
    .then( employee => {
        if (!employee) {
            res.status(404).send('No employee found.');
        } else {
            employee.destroy();
            employeeCache.needsToUpdate = true;
            res.status(200).json(employee);
        }  
    })
})

module.exports = router;