const express = require('express');
const router = express.Router();
const db = require('../models/index');
const checkJwt = require('../utils/jwt');
const jwtAuthz = require('express-jwt-authz');

router.get('/', checkJwt, jwtAuthz(['read:info']), function (req, res) {
    console.log('Headers', req.headers);
    db.Employee
    .findAll()
        .then(employees => {
            var results = employees.map( e => {
                return e.dataValues;
            })
            if (req.headers.origin.toUpperCase() === 'MOBILE') {
                res.status(200).send({value: results});
            } else if (req.headers.origin.toUpperCase() === 'WEB') {
                res.status(200).send(results);
            }
            
        })
})

router.get('/:id', checkJwt, jwtAuthz(['read:info']),function (req, res) {
    db.Employee
    .findById(req.params.id)
    .then( employee => {
        console.log(employee);
        var results = employee.map( e => {
            return e.dataValues;
        })
        if(!employee) {
            res.status(404).send('No employee found');
        } else {
            if (req.headers.origin.toUpperCase() === 'MOBILE') {
                res.status(200).send({value: results});
            } else if (req.headers.origin.toUpperCase() === 'WEB') {
                res.status(200).send(results);
            }
        }
    })
})

router.post('/', checkJwt, jwtAuthz(['write:info']), function (req, res) {
    var employee = req.body;
    db.Employee
    .create(employee)
    .then( employee => {
        console.log('ID:', employee.EmployeeID);
        res.status(201).json(employee.EmployeeID);
    })
})

router.put('/:id', checkJwt, jwtAuthz(['write:info']), function(req, res) {
    var employee = req.body;
    db.Employee
    .update(employee, {
        where: {id: req.params.id}
    })
    .then( employee => {
        if (!employee) {
            res.status(404).send('No employee found. Invalid ID.');
        } else {
            res.status(204).json(employee);
        }    
    })
})

router.delete('/:id', checkJwt, jwtAuthz(['delete:info']), function(req, res) {
    db.Employee
    .findById(req.params.id)
    .then( employee => {
        if (!employee) {
            res.status(404).send('No employee found. Invalid ID.');
        } else {
            employee.destroy()
            res.status(200).json(employee);
        }  
    })
})

module.exports = router;